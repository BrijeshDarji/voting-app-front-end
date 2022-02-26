import { makeStyles } from "@mui/styles"

export const PollListStyles = makeStyles((theme) => ({
    appBarRoot: { padding: "5px 0" },
    toolBarRoot: { justifyContent: "center" },
    root: {
        padding: "30px",
        fontFamily: theme.mixins.mediumText,
        height: "calc(100vh - 62px)",
    },
    createPoll: {
        width: "fit-content",
        cursor: "Pointer",
        color: theme.palette.siteBlack.light,
    },
    createPollContainer: {
        borderRadius: "4px",
        width: "500px",
        height: "500px",
        marginTop: "35px",
        ...theme.mixins.flex(),
        flexDirection: "column",
        padding: "50px",
    },
    title: {
        fontSize: "1.7rem",
    },
    spaceBelow: { marginBottom: "35px" },
    logoutIcon: {
        fontSize: "25px",
        color: theme.palette.siteWhite.main,
    },
    icon: {
        fontSize: "35px",
        color: theme.palette.primary.main,
    },
    iconButton: {
        position: "absolute !important",
        right: "30px",
    },
    pollIcon: {
        fontSize: "140px",
        color: theme.palette.primary.main,
    },
    noData: {
        ...theme.mixins.flex("center", "center"),
        flexDirection: "column",
        height: "calc(100vh - 170px)",
    },
    noDataText: {
        fontSize: "2rem",
        color: theme.palette.siteBlack.light,
    },
}))
