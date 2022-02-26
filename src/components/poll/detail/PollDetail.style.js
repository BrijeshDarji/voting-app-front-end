import { makeStyles } from "@mui/styles"

export const PollDetailStyles = makeStyles((theme) => ({
    appBarRoot: {
        padding: "5px 0",
        height: "51px",
    },
    toolBarRoot: { justifyContent: "center" },
    logoutButton: {
        position: "absolute !important",
        right: "30px",
    },
    backButton: {
        position: "absolute !important",
        left: "30px",
    },
    root: {
        padding: "30px",
        fontFamily: theme.mixins.mediumText,
        height: "calc(100vh - 52px)",
        ...theme.mixins.flex(),
    },
    voteContainer: { marginRight: "100px" },
    createPoll: {
        width: "fit-content",
        cursor: "Pointer",
    },
    title: { fontSize: "1.7rem" },
    spaceBelow: { marginBottom: "35px" },
    icon: {
        fontSize: "25px",
        color: theme.palette.siteWhite.main,
    },
    regularFont: { fontFamily: theme.mixins.regularText },
    addNew: {
        ...theme.mixins.flex("center"),
        color: "blue",
        cursor: "pointer",
    },
    autocompleteRoot: {
        width: "300px",
        marginTop: "60px",
    },
    chartContent: {
        overflow: "auto",
    },
    chart: {
        width: "100%",
    },
    vCenter: theme.mixins.flex("center")
}))
