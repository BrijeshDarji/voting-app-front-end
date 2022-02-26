import React, { memo, useState } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material"
import { useSnackbar } from "notistack"
import classnames from "classnames"

import LoaderButton from "../../LoaderButton"
import CreatePollValidator from "./CreatePollValidator"

import { formAttributes } from "../../../helpers/Utils"
import { POLL } from "../../../helpers/ApiPath"
import { server } from "../../../helpers/ApiHandler"
import { CreatePollStyles } from "./CreatePoll.style"

function CreatePoll(props) {
    const classes = CreatePollStyles()
    const { enqueueSnackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const handleCreatePoll = () => {
        props.handleSubmit()
        if (!props.isValid) return
        const { pollTitle, pollOptions } = props.values

        const postData = {
            title: pollTitle.trim(),
        }

        if (pollOptions.trim()) {
            const splitOptions = pollOptions.trim().split("\n")
            const filteredOptions = splitOptions.reduce((array, value) => {
                if (value.trim()) {
                    array.push(value.trim())
                }
                return array
            }, [])
            const uniqueOptions = [...new Set(filteredOptions)]
            postData.options = uniqueOptions
        }
        else {
            enqueueSnackbar("Please provide some options for poll", { variant: "error" })
            return
        }
        setLoading(true)

        server
            .post(POLL, postData)
            .then((response) => {
                if (response) {
                    const { success } = response
                    if (success) {
                        enqueueSnackbar("Poll created successfully", { variant: "success" })
                        props.onClose()
                        props.refresh()
                    }
                }
            })
            .catch((error) => {
                const { success, message } = error
                if (!success && message) {
                    enqueueSnackbar(message, { variant: "error" })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            classes={{ paper: classes.root }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
                <div className={classes.dialogTitle}>Create a Poll</div>

                <IconButton onClick={props.onClose}>
                    <i className={classnames("material-icons", classes.closeButton)}>
                        close
                    </i>
                </IconButton>
            </DialogTitle>

            <DialogContent dividers classes={{ root: classes.dialogContentRoot }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    size="medium"
                    margin="normal"
                    {...formAttributes(props, "pollTitle")}
                />

                <TextField
                    label="Options"
                    variant="outlined"
                    size="medium"
                    margin="normal"
                    multiline
                    rows={4}
                    {...formAttributes(
                        props,
                        "pollOptions",
                        "Provide options separated by line"
                    )}
                />
            </DialogContent>

            <DialogActions classes={{ root: classes.footer }}>
                <Button
                    color="inherit"
                    variant="contained"
                    onClick={props.onClose}
                    className={classes.button}
                >
                    Close
                </Button>

                <LoaderButton
                    variant="contained"
                    onClick={handleCreatePoll}
                    loading={loading}
                >
                    Create
                </LoaderButton>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePollValidator(memo(CreatePoll))
