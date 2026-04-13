import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { useGoals } from "../context/GoalContext"
import GoalCard from "../components/GoalCard";
import { useLanguage } from "../context/LanguageContext";

const Archive = () => {
    const { goals } = useGoals();
    const completedGoals = goals.filter(goal => goal.status === "Completed");
    const { t } = useLanguage();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, }}>
            <Box justifyContent="space-between" sx={{ mb: 1 }} >
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600">{t("archive")}</Typography>
                <Typography variant="body1" color="text.secondary">
                    {t("viewAllCom")}
                </Typography>
                <Divider sx={{ mb: 4 }} />
                {completedGoals.length === 0 ? (<Typography>No completed goal yet</Typography>)
                    :
                    (
                        <Grid container spacing={2}>
                            {completedGoals.map(goal => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <GoalCard goal={goal} />
                                </Grid>)
                            )}
                        </Grid>
                    )}
            </Box>

        </Container>
    )
}

export default Archive;