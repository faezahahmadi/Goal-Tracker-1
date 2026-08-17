
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsightsIcon from "@mui/icons-material/Insights";

import ListIcon from "@mui/icons-material/List";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const DRAWER_WIDTH = 240;

export default function SideBar({ mobileOpen = false, onCloseMobile }) {
    const { t } = useLanguage();

    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => { setOpen(!isMobile); }, [isMobile]);

    const navItems = [{
        text: t("dashboardTitle"),
        icon: <DashboardIcon sx={{ mr: 1 }} />,
        path: "/"
    },
    {
        text: t("categoryTitle"),
        icon: < CategoryIcon sx={{ mr: 1 }} />,
        path: "/categories"
    },
    {
        text: t("CreateNewGoal"),
        icon: <AddIcon sx={{ mr: 1 }} />,
        path: "/createGoal"
    },

    {
        text: t("goalList"),
        icon: <ListIcon sx={{ mr: 1 }} />,
        path: "/goalsList"
    },
    {
        text: "Calendar",
        icon: <CalendarMonthIcon sx={{ mr: 1 }} />,
        path: "/calendar"
    },
    {
        text: "Analytics",
        icon: <InsightsIcon sx={{ mr: 1 }} />,
        path: "/analytics"
    },

    {
        text: t("archive"),
        icon: <ArchiveIcon sx={{ mr: 1 }} />,
        path: "/Archive"
    },

    {
        text: t("settings"),
        icon: <SettingsIcon sx={{ mr: 1 }} />,
        path: "/settings"
    },
    ]

    const navList = (forceOpenLabels) => (
        <List>
            {navItems.map((item) => (
                <ListItemButton
                    key={item.text}
                    component={NavLink}
                    to={item.path}
                    onClick={onCloseMobile}
                    sx={{
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: forceOpenLabels || open ? "row" : "column",
                        mb: 1,
                        textDecoration: "none",
                        "&.active": {
                            backgroundColor: "primary.main",
                            color: "white",
                            "& .MuiListItemIcon-root": {
                                color: "white",
                            },
                        },
                        "&:hover": {
                            backgroundColor: "action.hover"
                        },
                    }}>
                    <ListItemIcon sx={{
                        color: "text.secondary",
                        justifyContent: "center",
                    }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText sx={{ display: forceOpenLabels || open ? "block" : "none", }}>
                        {item.text}
                    </ListItemText>
                </ListItemButton>
            ))}
        </List>
    );

    // On mobile, the sidebar becomes a temporary overlay drawer opened from the Navbar
    // menu button, instead of a persistent rail that eats into the small viewport.
    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onCloseMobile}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        p: 2,
                    },
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                    {t("navigation")}
                </Typography>
                {navList(true)}
            </Drawer>
        );
    }

    return (
        <Box sx={{
            width: open ? DRAWER_WIDTH : 60,
            transition: "0.4s",
            minHeight: "calc(100vh-64px)",
            borderRight: "1px solid",
            borderColor: "divider",
            p: 2,
            flexShrink: 0,
        }}>
            <Box sx={{ display: "flex", alignItems: "center", }}>
                <IconButton onClick={() => setOpen(!open)}>
                    <MenuIcon />
                </IconButton>
                {open &&
                    (<Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary", }}>
                        {t("navigation")}
                    </Typography>)
                }

            </Box>

            {navList(false)}
        </Box>

    )

}
