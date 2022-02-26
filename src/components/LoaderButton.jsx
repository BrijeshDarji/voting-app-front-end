import React from "react"
import classnames from "classnames"
import { Button, CircularProgress } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    loader: {
        color: "#686060 !important",
        width: "0px !important",
        height: "unset !important",
        transition: "all 0.3s",
    },
    show: {
        width: "1em !important",
        marginLeft: "10px",
    },
    button: {
        fontFamily: `${theme.mixins.mediumText} !important`,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "4px",
    },
}))

const LoaderButton = ({
    loading,
    children,
    disabled,
    ...otherProps
}) => {
    const classes = useStyles()

    return (
        <Button
            {...otherProps}
            disabled={loading || disabled}
            className={classes.button}
            endIcon={
                <CircularProgress
                    className={classnames(classes.loader, { [classes.show]: loading })}
                />
            }
        >
            {children}
        </Button>
    )
}

export default LoaderButton
