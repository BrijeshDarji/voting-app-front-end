import React, { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppBar, IconButton, Toolbar } from "@mui/material"
import { useSnackbar } from "notistack"
import queryString from "query-string"

import CreatePoll from "./CreatePoll"
import classNames from "classnames"
import TableComponent from "./TableComponent"

import { URL_LOGIN } from "../../../helpers/SitePath"
import { server } from "../../../helpers/ApiHandler"
import { PollListStyles } from "./PollList.style"
import { POLL } from "../../../helpers/ApiPath"

const PollColumn = [
    {
        id: "title",
        label: "Poll Title",
        paddingLeft: "40px",
    },
    {
        id: "view",
        label: "View",
        processCell: (row, restProps) => (
            <IconButton onClick={() => restProps.handleViewPoll(row._id)}>
                <i className="material-icons"> input </i>
            </IconButton>
        ),
        width: "100px",
    },
    {
        id: "remove",
        label: "Remove",
        processCell: (row, restProps) => (
            <IconButton onClick={() => restProps.handleDeletePoll(row._id)}>
                <i className="material-icons"> delete </i>
            </IconButton>
        ),
        width: "100px",
    },
]

function PollList() {
    const classes = PollListStyles()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const [hasData, setHasData] = useState(true)
    const [pollData, setPollData] = useState([])
    const [openCreatePollDialog, setOpenCreatePollDialog] = useState(false)
    const [recordCount, setRecordCount] = useState(0)
    const [filters, setFilters] = useState({
        limit: 20,
        page: 0,
    })

    useEffect(() => {
        getPollList()
        //eslint-disable-next-line
    }, [])

    const getPollList = (apiFilter = filters) => {
        const queryParams = queryString.stringify(apiFilter)
        const URL = `${POLL}/?${queryParams}`

        server
            .get(URL)
            .then(response => {
                if (response) {
                    const { success, data } = response

                    if (success && data) {
                        setPollData(data.list)
                        setRecordCount(data.count)
                        setHasData(data.count > 0)
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

    const toggleCreatePollDialog = () =>
        setOpenCreatePollDialog((value) => !value)

    const handlePagination = (pageNumber, rowPerPage) => {
        if (
            filters.page !== pageNumber ||
            filters.limit !== rowPerPage
        ) {
            const newFilters = {
                ...filters,
                page: pageNumber,
                limit: rowPerPage,
            }
            setFilters(newFilters)
            getPollList(newFilters)
        }
    }

    const handleViewPoll = (id) => {
        navigate(id)
    }

    const handleDeletePoll = (id) => {
        server
            .delete(`${POLL}/${id}`)
            .then(response => {
                if (response?.success) {
                    enqueueSnackbar("Poll deleted successfully", { variant: "success" })
                    getPollList()
                }
            })
            .catch((error) => {
                const { success, message } = error
                if (!success && message) {
                    enqueueSnackbar(message, { variant: "error" })
                }
            })
    }

    return (
        <>
            <AppBar position="static" classes={{ root: classes.appBarRoot }}>
                <Toolbar classes={{ root: classes.toolBarRoot }}>
                    <div className={classes.title}> Voting App </div>

                    <IconButton
                        title="Logout"
                        classes={{ root: classes.iconButton }}
                        onClick={handleLogout}
                    >
                        <i className={classNames("material-icons", classes.logoutIcon)}>
                            logout
                        </i>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div className={classes.root}>
                <div
                    className={classNames(classes.createPoll, classes.spaceBelow)}
                    onClick={toggleCreatePollDialog}
                >
                    <IconButton>
                        <i className={classNames("material-icons", classes.icon)}>
                            add_circle_outline
                        </i>
                    </IconButton>
                    Create a Poll
                </div>

                {
                    openCreatePollDialog && (
                        <CreatePoll
                            open={openCreatePollDialog}
                            onClose={toggleCreatePollDialog}
                            refresh={getPollList}
                        />
                    )
                }

                {
                    hasData
                        ? (
                            <TableComponent
                                columns={PollColumn}
                                rows={pollData}
                                height="calc(100vh - 220px)"
                                tblClasses={classes}
                                index="_id"
                                recordCount={recordCount}
                                pageNo={filters.page}
                                handlePagination={handlePagination}
                                handleViewPoll={handleViewPoll}
                                handleDeletePoll={handleDeletePoll}
                            />
                        )
                        : (
                            <div className={classes.noData}>
                                <i className={classNames("material-icons", classes.pollIcon)}>poll</i>
                                <div className={classes.noDataText}>
                                    No Poll Found
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default memo(PollList)
