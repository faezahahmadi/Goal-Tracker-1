import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import Navbar from "../components/Navbar";
import { Paper } from "@mui/material";
import { useMemo, useState } from "react";
import getTheme from "../theme";
import { useThemeContext } from "../context/ThemeContext";
export default function Layout() {
    const { mode, toggleMode, theme } = useThemeContext();


    const handleMenuClick = () => {
        alert("Menu clicked (later we can make this open a drawer)");
    };


    return (

        <Box sx={{ overflowX: "hidden" }}>
            <CssBaseline />
            <Navbar onMenuClick={handleMenuClick}
                mode={mode}
                onToggleMode={toggleMode} />
            <Box sx={{ display: "flex" }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
                    <Paper elevation={3} sx={{ p: 3, minHeight: "calc(100vh - 64px)" }}>
                        <Outlet />
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}