import React, { memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useSnackbar } from "notistack"
import classNames from "classnames"

import LoaderButton from "../LoaderButton"
import SignUpValidator from "./SignUpValidator"

import { URL_LOGIN } from "../../helpers/SitePath"
import { formAttributes } from "../../helpers/Utils"
import { USER } from "../../helpers/ApiPath"
import { server } from "../../helpers/ApiHandler"
import { LogInStyles } from "../login/Login.style"

function SignUp(props) {
    const classes = LogInStyles()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const toggleShow = () => setShowPassword((value) => !value)

    const handleSignUp = () => {
        props.handleSubmit()
        if (!props.isValid) return

        const postData = {
            ...props.values,
            username: props.values.username.trim(),
            password_confirm: props.values.password,
        }
        setButtonLoading(true)

        server
            .post(USER.SIGN_UP, postData)
            .then((response) => {
                if (response) {
                    const { success } = response

                    if (success) {
                        enqueueSnackbar("Congratulations! your account is created successfully", { variant: "success" })
                        navigate(URL_LOGIN)
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
                setButtonLoading(false)
            })
    }

    return (
        <div className={classes.root}>
            <div className={classes.contentSection}>
                <div className={classes.content}>
                    <div className={classNames(classes.title, classes.spaceBelow)}>
                        Sign Up
                    </div>

                    <TextField
                        label="User Name"
                        variant="outlined"
                        fullWidth
                        size="medium"
                        className={classes.spaceBelow}
                        {...formAttributes(props, "username")}
                    />

                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        size="medium"
                        className={classes.spaceBelow}
                        {...formAttributes(props, "email")}
                    />

                    <TextField
                        variant="outlined"
                        label="Password"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        className={classes.spaceBelow}
                        {...formAttributes(props, "password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShow}
                                        edge="end"
                                    >
                                        <i className="material-icons">
                                            {showPassword ? "visibility" : "visibility_off"}
                                        </i>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div className={classes.spaceBelow}>
                        <LoaderButton
                            variant="contained"
                            onClick={handleSignUp}
                            loading={buttonLoading}
                            classes={{ root: classes.button }}
                        >
                            Sign Up
                        </LoaderButton>
                    </div>

                    <div className={classes.mediumText}>
                        <span className={classes.grayText}> Already have an account? </span>
                        <span className={classes.link} onClick={() => navigate(URL_LOGIN)}>
                            Login
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpValidator(memo(SignUp))
