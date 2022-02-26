import React from 'react'
import { makeStyles } from '@mui/styles'
import { CircularProgress } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100vh",
        width: "100%",
        fontSize: '25px',
        color: theme.palette.siteBlack.normal,
        ...theme.mixins.flex("center", "center"),
        flexDirection: "column",
    },
    text: { marginTop: "20px" }
}))

function LoadingFallback() {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <CircularProgress />
            <div className={classes.text}>
                Please wait while page is loading...
            </div>
        </div>
    )
}

export default LoadingFallback
