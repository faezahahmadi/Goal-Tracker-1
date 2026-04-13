import { Button, Paper, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
    const navigate = useNavigate();
    const { t } = useLanguage();


    function handleBack() {
        navigate("./dashboard");
    }
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={7} sx={{ p: 3 }}>


                <Typography sx={{ p: 2 }} variant="h3">{t("noGoalsFound")}</Typography>
                <Button
                    variant="contained"
                    onClick={handleBack}>{t("backToDashboard")}</Button>
            </Paper>
        </Container>


    );
}