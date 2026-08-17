import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useGoals } from "../context/GoalContext";
import { useState } from "react";

import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { CircularProgress } from "@mui/material";

import Navbar from "../components/Navbar";
import { Paper } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
export default function Layout() {
    const { mode, toggleMode, theme } = useThemeContext();
    const { loading } = useGoals();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleMenuClick = () => {
        setMobileOpen((v) => !v);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (

        <Box sx={{ overflowX: "hidden" }}>
            <CssBaseline />
            <Navbar onMenuClick={handleMenuClick}
                mode={mode}
                onToggleMode={toggleMode} />
            <Box sx={{ display: "flex" }}>
                <SideBar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
                <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
                    <Paper elevation={3} sx={{ p: 3, minHeight: "calc(100vh - 64px)" }}>
                        <Outlet />
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}