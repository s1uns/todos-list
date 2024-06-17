import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiGrid: {
            styleOverrides: {
                item: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15,
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
});

export default theme;
