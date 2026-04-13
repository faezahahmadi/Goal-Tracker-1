import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import DashboardTopSummary from "../components/Dashboard/DashboardTopSummary";
import calculateXP from "../components/Dashboard/CalculateXp";
import ActiveGoals from "../components/Dashboard/ActiveGoals";
import { useGoals } from "../context/GoalContext";
import CompletedPreview from "../components/Dashboard/CompletedPreview";
import QuickActions from "../components/Dashboard/QuickActions";
import { useLanguage } from "../context/LanguageContext";

export default function Dashboard({ setGoals }) {
    const { totalCompleted, streak, overallProgress, goals } = useGoals();
    const xp = calculateXP(goals, streak);
    const { t } = useLanguage();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, }}>
            <Box justifyContent="space-between" sx={{ mb: 1 }}  >
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600" >{t("dashboardTitle")}</Typography>

                <Typography variant="body1" color="text.secondary">
                    {t("dashboardSubtitle")}
                </Typography>
            </Box>
            <Divider />
            <Grid container sx={{ mt: 5 }} spacing={2}>
                <Grid item xs={12} md={9}>
                    <DashboardTopSummary
                        totalCompleted={totalCompleted}
                        streak={streak}
                        xp={xp}
                        overallProgress={overallProgress} />
                </Grid>

                <Grid item xs={12} md={9}>
                    <QuickActions />
                </Grid>
            </Grid>

            <Grid container spacing={2} flexWrap={"wrap"}>
                <Grid item xs={12} md={6}>
                    <ActiveGoals />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CompletedPreview />
                </Grid>
            </Grid>
        </Container >
    );
}