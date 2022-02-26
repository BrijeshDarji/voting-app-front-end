import { makeStyles } from "@mui/styles"
import VoteImage from "../../assets/images/vote.jpeg"

export const LogInStyles = makeStyles((theme) => ({
    root: {
        ...theme.mixins.flex("center", "center"),
        fontFamily: theme.mixins.regularText,
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${VoteImage}) no-repeat center center`,
        backgroundSize: "cover",
    },
    contentSection: {
        width: "500px",
        margin: "50px 0"
    },
    content: {
        borderRadius: "6px",
        ...theme.mixins.flex("center", "center"),
        flexDirection: "column",
        backgroundColor: theme.palette.siteWhite.main,
        padding: "50px"
    },
    title: {
        fontFamily: theme.mixins.mediumText,
        fontSize: "2rem",
    },
    spaceBelow: { marginBottom: "35px !important" },
    button: {
        backgroundColor: theme.palette.primary.main,
        fontFamily: theme.mixins.mediumText,
        fontSize: "14px",
        padding: "10px 30px !important",
    },
    mediumText: { fontFamily: theme.mixins.mediumText },
    grayText: { color: theme.palette.siteBlack.light },
    link: {
        cursor: "pointer",
        color: theme.palette.primary.main,
    },
}))
