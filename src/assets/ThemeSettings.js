import { createTheme } from '@mui/material/styles'

export const siteColors = {
    primary: {
        main: "#2557e8",
    },
    siteBlack: {
        main: "#212121",
        light: "#5e6367",
        dark: "#000000",
        bold: "#292929",
        normal: "#252525",
    },
    siteGray: {
        main: "#9aa1a9",
        light: "#e8edef",
        normal: "#e0e0e0",
        bg: "#99999933",
    },
    siteWhite: {
        main: "#ffffff"
    }
}

export const ThemeSettings = createTheme({
    palette: siteColors,
    mixins: {
        toolbar: { color: "white" },
        regularText: "Roboto-Regular",
        mediumText: "Roboto-Medium",
        boldText: "Roboto-Bold",
        flex: (align, justify) => {
            let obj = { display: "flex" }
            if (align) {
                obj["alignItems"] = align
            }
            if (justify) {
                obj["justifyContent"] = justify
            }
            return obj
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    backgroundColor: "inherit",
                    lineHeight: "inherit",
                    padding: "8px",
                },
                head: {
                    fontSize: "inherit",
                    backgroundColor: "inherit",
                    lineHeight: "inherit",
                },
                stickyHeader: {
                    fontSize: "inherit",
                    backgroundColor: "inherit",
                    lineHeight: "inherit",
                },
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                contained: {
                    marginLeft: 0,
                    marginRight: 0,
                },
            },
        },
    }
})
