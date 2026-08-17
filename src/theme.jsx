import { createTheme } from "@mui/material/styles";

export default function getTheme(mode = "light", dir) {
    const isDark = mode === "dark";

    return createTheme({
        dir,
        palette: {
            mode,
            primary: {
                main: "#1954d2",
                light: "#5c82e6",
                dark: "#0f3a99",
            },
            secondary: {
                main: "#8e24aa",
            },
            success: { main: "#2e7d32" },
            warning: { main: "#ed8f03" },
            error: { main: "#d32f2f" },
            info: { main: "#0288d1" },
            background: {
                default: isDark ? "#0b1220" : "#f4f6fb",
                paper: isDark ? "#0f172a" : "#ffffff",
            },
        },
        typography: {
            fontFamily: ["Inter", "system-ui", "Arial", "sans-serif"].join(","),
            h3: { fontWeight: 800, letterSpacing: -0.5 },
            h4: { fontWeight: 800 },
            h5: { fontWeight: 700 },
            h6: { fontWeight: 700 },
            button: { fontWeight: 600, textTransform: "none" },
        },
        shape: { borderRadius: 14 },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                        backgroundImage: "none",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        boxShadow: "none",
                    },
                    contained: {
                        "&:hover": { boxShadow: "0 6px 16px rgba(25,84,210,0.25)" },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: { borderRadius: 999 },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundImage: isDark
                            ? "linear-gradient(90deg, #0f172a 0%, #1954d2 140%)"
                            : "linear-gradient(90deg, #1954d2 0%, #3f6fe0 100%)",
                    },
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: { borderRadius: 999 },
                },
            },
        },
    });
}
