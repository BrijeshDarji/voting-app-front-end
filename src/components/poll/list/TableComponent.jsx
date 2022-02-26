import React, { memo, useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material"

const useStyles = makeStyles((theme) => ({
    tableHeader: {
        fontFamily: theme.mixins.mediumText,
        backgroundColor: theme.palette.siteGray.normal,
        color: theme.palette.siteBlack.dark,
        height: "56px",
        "&>tr": {
            height: "56px",
        },
    },
    pagination: {
        color: `${theme.palette.siteBlack.light} !important`,
        fontFamily: theme.mixins.mediumText,
        minHeight: "40px !important",
    },
    table: {
        fontFamily: theme.mixins.regularText,
        backgroundColor: theme.palette.siteWhite.main,
        color: theme.palette.siteBlack.main,
        fontSize: "0.875rem",
        wordBreak: "break-word",
    },
    tableCellRoot: {
        fontFamily: theme.mixins.mediumText,
    },
    containedBody: {
        width: "unset",
        height: ({ height }) => height,
        border: `1px solid ${theme.palette.siteGray.normal}`,
        borderRadius: "10px",
    },
}))

const EnhancedTableHead = (props) => {
    const { classes, columns } = props

    return (
        <TableHead className={classes.tableHeader}>
            <TableRow style={{ backgroundColor: "inherit" }}>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        style={{
                            minWidth: headCell.minWidth || "100px",
                            paddingLeft: headCell.paddingLeft || "auto",
                            paddingRight: headCell.paddingRight || "auto",
                            width: headCell.width || "auto",
                        }}
                        align={headCell.align || "left"}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

function TableComponent({
    columns,
    rows,
    height,
    index,
    ...restProps
}) {
    const classes = useStyles({
        height,
    })
    const [page, setPage] = useState(restProps.pageNo || 0)
    const [rowsPerPage, setRowsPerPage] = useState(restProps.rowsPerPage || 20)

    useEffect(() => {
        restProps.handlePagination &&
            restProps.handlePagination(page, rowsPerPage)
        // eslint-disable-next-line
    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <>
            <TableContainer className={classes.containedBody}>
                <Table className={classes.table} stickyHeader>
                    <EnhancedTableHead columns={columns} classes={classes} />

                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover key={`row-${row[index]}`} data-key={row[index]}>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={`r-${row[index]}-c-${column.id}`}
                                            align={column.align || "left"}
                                            style={{
                                                paddingLeft: column.paddingLeft || "auto",
                                                paddingRight: column.paddingRight || "auto",
                                            }}
                                        >
                                            {column.processCell
                                                ? column.processCell(row, restProps)
                                                : row[column.id] || "-"}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                classes={{ toolbar: classes.pagination }}
                count={restProps.recordCount || rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default memo(TableComponent)
