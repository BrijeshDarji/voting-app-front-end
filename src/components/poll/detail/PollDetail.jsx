import React, { memo, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    AppBar,
    Autocomplete,
    FormControl,
    IconButton,
    InputLabel,
    TextField,
    Toolbar,
} from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { useSnackbar } from "notistack"
import { TwitterShareButton, TwitterIcon } from "react-share";
import classNames from "classnames"

import LoaderButton from "../../LoaderButton"
import PollDetailValidator from "./PollDetailValidator"

import { POLL, POLL_ANSWER } from "../../../helpers/ApiPath"
import { Colours } from "../../../assets/StaticData"
import { server } from "../../../helpers/ApiHandler"
import { URL_LOGIN, URL_POLL_LIST } from "../../../helpers/SitePath"
import { PollDetailStyles } from "./PollDetail.style"

ChartJS.register(ArcElement, Tooltip, Legend)

function PollDetail(props) {
    const classes = PollDetailStyles()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const params = useParams()

    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [pollData, setPollData] = useState({
        pollOptions: [],
        pollTitle: "",
        optionLabelList: [],
        voteCount: [],
        noVoteYet: true,
    })

    const data = {
        labels: pollData.optionLabelList,
        datasets: [
            {
                label: pollData.pollTitle,
                data: pollData.voteCount,
                backgroundColor: Colours,
                borderWidth: 1,
            },
        ],
    }

    useEffect(() => {
        getPollDetail()
        //eslint-disable-next-line
    }, [])

    const getPollDetail = () => {
        const URL = `${POLL}/${params.id}`

        server
            .get(URL)
            .then(response => {
                if (response) {
                    const { success, data } = response

                    if (success && data) {
                        const pollData = {
                            pollOptions: [],
                            pollTitle: data.title,
                            optionLabelList: [],
                            voteCount: []
                        }

                        data.pollOptions.forEach(ele => {
                            pollData.pollOptions.push({
                                id: ele._id,
                                name: ele.option,
                            })
                            pollData.optionLabelList.push(ele.option)
                            pollData.voteCount.push(ele.recipients.length)
                        })
                        pollData.noVoteYet = pollData.voteCount.every(el => el === 0)

                        setPollData(pollData)
                    }
                }
            })
            .catch((error) => {
                const { success, message } = error
                if (!success && message) {
                    enqueueSnackbar(message, { variant: "error" })
                }
            })
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        enqueueSnackbar("Logged out successfully", { variant: "success" })
        navigate(URL_LOGIN)
    }

    const handleOptionChange = (e, selected) => {
        const value = selected || {}
        props.setFieldValue("selectedOption", value)
    }

    const handleInputChange = (e, value) => {
        setSearchValue(value)
    }

    const addNewRecord = () => {
        const URL = `${POLL_ANSWER}/${params.id}`
        const postData = { option: searchValue.trim() }

        server
            .post(URL, postData)
            .then(response => {
                if (response) {
                    const { success, data } = response

                    if (success && data) {
                        enqueueSnackbar(`'${data.option}' option created successfully`, { variant: "success" })
                        getPollDetail()
                        props.setFieldValue("selectedOption", {
                            id: data._id,
                            name: data.option,
                        })
                    }
                }
            })
    }

    const handlePollSelection = () => {
        props.handleSubmit()
        if (!props.isValid) return

        setLoading(true)
        const URL = `${POLL_ANSWER}/${props.values.selectedOption.id}`

        server
            .put(URL)
            .then((response) => {
                if (response) {
                    const { success, data } = response

                    if (success && data) {
                        enqueueSnackbar(`You've successfully given vote to '${data.option}'`, { variant: "success" })
                        getPollDetail()
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
        <>
            <AppBar position="static" classes={{ root: classes.appBarRoot }}>
                <Toolbar classes={{ root: classes.toolBarRoot }}>
                    <IconButton
                        title="Back"
                        classes={{ root: classes.backButton }}
                        onClick={() => navigate(URL_POLL_LIST)}
                    >
                        <i className={classNames("material-icons", classes.icon)}>
                            arrow_back
                        </i>
                    </IconButton>

                    <div className={classes.title}> {pollData.pollTitle} </div>

                    <IconButton
                        title="Logout"
                        classes={{ root: classes.logoutButton }}
                        onClick={handleLogout}
                    >
                        <i className={classNames("material-icons", classes.icon)}>logout</i>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div className={classes.root}>
                <div className={classes.voteContainer}>
                    <div className={classes.spaceBelow}>
                        <FormControl variant="standard">
                            <InputLabel>I would like to vote for:</InputLabel>

                            <Autocomplete
                                options={pollData.pollOptions}
                                value={props.values.selectedOption}
                                classes={{
                                    paper: "regular-text",
                                    option: classes.regularFont,
                                    root: classes.autocompleteRoot,
                                }}
                                getOptionLabel={(ele) => ele?.name || ""}
                                onChange={handleOptionChange}
                                onInputChange={handleInputChange}
                                noOptionsText={
                                    searchValue?.trim() ? (
                                        <div className={classes.addNew} onMouseDown={addNewRecord}>
                                            <i className="material-icons">add</i>
                                            Add "{searchValue.trim()}"
                                        </div>
                                    ) : (
                                        "No options"
                                    )
                                }
                                filterSelectedOptions
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Select Option"
                                            placeholder="Select Option"
                                            error={
                                                props?.submitCount > 0 &&
                                                props?.errors["selectedOption"]
                                            }
                                            helperText={
                                                props?.submitCount > 0 &&
                                                props?.errors["selectedOption"]
                                            }
                                        />
                                    )
                                }}
                            />
                        </FormControl>
                    </div>

                    <div className={classes.vCenter}>
                        <LoaderButton
                            variant="contained"
                            onClick={handlePollSelection}
                            loading={loading}
                        >
                            Submit
                        </LoaderButton>

                        &emsp;&emsp;
                        <TwitterShareButton
                            title={`Please give your valuable vote to the poll "${pollData.pollTitle}", `}
                            url={window.location.href}
                        >
                            <TwitterIcon
                                size={32}
                                round={true}
                            />
                        </TwitterShareButton>
                    </div>
                </div>

                {
                    !pollData.noVoteYet && (
                        <div className={classes.chartContent}>
                            <div className={classes.chart}>
                                <Pie
                                    data={data}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: "bottom",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default PollDetailValidator(memo(PollDetail))
