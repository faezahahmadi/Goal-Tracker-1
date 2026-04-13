import { Box, Card, Chip, Grid, Typography, Stack, Container } from "@mui/material";
import { useGoals } from "../../context/GoalContext";
import { BorderColor, BorderTop, Height } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function CompletedPreview() {
    const navigate = useNavigate();
    const { goals } = useGoals();
    const { t } = useLanguage();

    const CompletedPreview = goals.filter(goal => goal.status === "Completed").slice(0, 4);
    return (
        <Container maxWidth="lg">
            <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3, mt: 5, mb: 4, borderTop: 4, borderColor: "green" }}>
                <Typography variant="h6" fontWeight={"bold"} sx={{ mb: 2 }}>  {t("recentlyComGoal")}
                </Typography>
                <Chip onClick={() => navigate("/Archive")}
                    label={t("openInArchive")}
                    color="info">
                </Chip>
                <Grid container direction={"column"} >
                    {CompletedPreview.map((goal) => (
                        <Grid item xs={12}>
                            <Card sx={{ mb: 2, p: 1.5, display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{ mr: 1 }}>
                                    {goal.title}
                                </Typography>
                                <Chip
                                    label={t("completed")}
                                    value="Completed"
                                    color="success"
                                    variant="filled"
                                    size="small"
                                />
                            </Card>
                        </Grid>
                    )
                    )}

                </Grid>
            </Box>

        </Container>
    )
}