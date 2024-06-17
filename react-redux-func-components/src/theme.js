import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
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
