import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import { Flag, GTranslate, SportsScore } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@mui/material";
import target from "../assets/target.svg"
export default function Navbar({ mode, onToggleMode }) {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <AppBar position="static" elevation={10} >
            <Toolbar sx={{ gap: 1 }}>
                <Box component="img" src={target} sx={{ height: 32, width: 32, mr: 1, color: "white" }} />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.4rem", lg: "1.4rem" } }}>
                        {t("goalTracker")}
                    </Typography>
                </Box>
                <Tooltip title={mode === "dark" ? t("lightMode") : t("darkMode")}>
                    <IconButton color="inherit" onClick={onToggleMode}>
                        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={language === "en" ? "fa" : "en"}>
                    <Button
                        startIcon={<GTranslate
                            sx={{
                                mr: language === "en" ? 1 : 0,
                                ml: language === "fa" ? 1 : 0
                            }} />}
                        color="inherit"
                        onClick={() => toggleLanguage(language ===
                            "en" ? "fa" : "en")}>
                        {language === "en" ? "fa" : "en"}
                    </Button>
                </Tooltip>

            </Toolbar>
        </AppBar >
    );
}