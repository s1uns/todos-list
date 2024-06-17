import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: { variant: "h1" },
                    style: {
                        color: "goldenrod",
                        fontSize: "5rem",
                        marginBottom: "-0.001rem",
                    },
                },
                {
                    props: { variant: "2" },
                    style: {
                        color: "grey",
                        fontSize: "2.5rem",
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    width: "calc(100% - 2rem)",
                    padding: "1rem",
                    border: "none",
                    borderRadius: " 0.5rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    fontSize: "2rem",
                    cursor: "pointer",
                    marginTop: "1rem",

                    "&:hover": {
                        backgroundColor: "#009bf3",
                    },
                    "&:disabled": {
                        backgroundColor: "grey",

                        "&:hover": {
                            cursor: "pointer",
                        },
                    },
                },
            },
        },
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
