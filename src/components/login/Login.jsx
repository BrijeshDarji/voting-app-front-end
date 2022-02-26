import React, { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useSnackbar } from "notistack"
import classNames from "classnames"

import LoginValidator from "./LoginValidator"
import LoaderButton from "../LoaderButton"

import { USER } from "../../helpers/ApiPath"
import { formAttributes } from "../../helpers/Utils"
import { URL_POLL_LIST, URL_SIGN_UP } from "../../helpers/SitePath"
import { server } from "../../helpers/ApiHandler"
import { LogInStyles } from "./Login.style"

function Login(props) {
    const classes = LogInStyles()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("token")

        if (isLoggedIn) {
            return navigate(URL_POLL_LIST)
        }
        //eslint-disable-next-line
    }, [])

    const toggleShow = () => setShowPassword((value) => !value)

    const handleLogin = () => {
        props.handleSubmit()
        if (!props.isValid) return

        const postData = {
            ...props.values,
        }
        setButtonLoading(true)

        server
            .post(USER.SIGN_IN, postData)
            .then((response) => {
                const { success, data } = response

                if (success && data?.token) {
                    enqueueSnackbar("Logged in successfully", { variant: "success" })
                    localStorage.setItem("token", data.token)
                    navigate(URL_POLL_LIST)
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
                        Login
                    </div>

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
                            onClick={handleLogin}
                            loading={buttonLoading}
                            classes={{ root: classes.button }}
                        >
                            Login
                        </LoaderButton>
                    </div>

                    <div className={classes.mediumText}>
                        <span className={classes.grayText}> Don't have an account? </span>
                        <span
                            className={classes.link}
                            onClick={() => navigate(URL_SIGN_UP)}
                        >
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginValidator(memo(Login))
