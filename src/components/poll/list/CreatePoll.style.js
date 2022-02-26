
import { makeStyles } from "@mui/styles"

export const CreatePollStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        color: theme.palette.siteBlack.main,
        backgroundColor: theme.palette.siteWhite.main,
        fontFamily: theme.mixins.regularText,
    },
    dialogTitleRoot: {
        padding: "8px 25px 8px 40px !important",
        fontSize: "18px !important",
        color: theme.palette.siteWhite.main,
        backgroundColor: theme.palette.primary.main,
        ...theme.mixins.flex("center"),
    },
    dialogTitle: { flexGrow: 1, fontFamily: theme.mixins.mediumText },
    dialogContentRoot: {
        ...theme.mixins.flex(),
        flexDirection: "column",
        padding: "20px 40px !important",
        fontSize: "15px",
        color: theme.palette.siteBlack.light,
    },
    closeButton: { color: theme.palette.siteWhite.main },
    button: {
        fontFamily: `${theme.mixins.mediumText} !important`,
    },
    footer: {
        display: "flex",
        justifyContent: "space-between !important",
        fontFamily: theme.mixins.mediumText,
        margin: "15px 40px",
    },
}))
