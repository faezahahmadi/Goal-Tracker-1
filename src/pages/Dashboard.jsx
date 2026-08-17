import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import DashboardTopSummary from "../components/Dashboard/DashboardTopSummary";
import ActiveGoals from "../components/Dashboard/ActiveGoals";
import { useGoals } from "../context/GoalContext";
import CompletedPreview from "../components/Dashboard/CompletedPreview";
import QuickActions from "../components/Dashboard/QuickActions";
import LevelCard from "../components/Dashboard/LevelCard";
import StatChip from "../components/goals/StatChip";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useLanguage } from "../context/LanguageContext";

export default function Dashboard() {
    const { totalCompleted, streak, streakStats, overallProgress, totalXP } = useGoals();
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
                        xp={totalXP}
                        overallProgress={overallProgress} />
                </Grid>

                <Grid item xs={12} md={3}>
                    <LevelCard xp={totalXP} />
                </Grid>

                <Grid item xs={12} md={9}>
                    <QuickActions />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12} sm={4}>
                    <StatChip
                        icon={<EmojiEventsIcon color="secondary" />}
                        label="Longest Streak"
                        value={`${streakStats.longestStreak} days`}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatChip
                        icon={<CalendarViewWeekIcon color="info" />}
                        label="Weekly Completion"
                        value={`${streakStats.weeklyCompletion}%`}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatChip
                        icon={<CalendarMonthIcon color="success" />}
                        label="Monthly Completion"
                        value={`${streakStats.monthlyCompletion}%`}
                    />
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
