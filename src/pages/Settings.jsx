import { Box, Button, Card, Container, Divider, IconButton, ThemeProvider, Tooltip, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { GTranslate } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";
export default function Settings() {
    const { language, toggleLanguage, t } = useLanguage();
    const { mode, toggleMode } = useThemeContext();

    return (

        <Container maxWidth="lg" sx={{ mt: 4, }}>
            <Box justifyContent="space-between" sx={{ mb: 1 }}  >
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600" >{t("settings")}</Typography>

                <Typography variant="body1" color="text.secondary">
                    {t("settingSubTitle")}
                </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />
            <Card
                variant="outlined"
                elevation={5}
                sx={{
                    width: "250px",
                    height: "100px",
                    border: "2px solid #1976d2",
                    boxShadow: 3,
                    mb: 4
                }} >
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}>
                    <Typography
                        variant="h6"
                        sx={{ mb: 1 }}>
                        {t("changeLang")}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        color={mode === "dark" ? "white" : "primary"}
                        startIcon={<GTranslate
                            sx={{
                                mr: language === "en" ? 1 : 0,
                                ml: language === "fa" ? 1 : 0
                            }} />}
                        onClick={() => toggleLanguage(language ===
                            "en" ? "fa" : "en")}>
                        {language === "en" ? "fa" : "en"}
                    </Button>
                </Box>
            </Card>
            <Card
                variant="outlined"
                elevation={5}
                sx={{
                    width: "250px",
                    height: "100px",
                    border: "2px solid #275511",
                    boxShadow: 3,
                }}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}>
                    <Typography
                        variant="h6"
                        sx={{ mb: 1 }}>
                        {t("changeTheme")}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        color={mode === "dark" ? "white" : "primary"}
                        startIcon={mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                        onClick={() => toggleMode()}>
                        {mode === "dark" ? t("lightMode") : t("darkMode")}

                    </Button>
                </Box>
            </Card>
        </Container>

    );
}