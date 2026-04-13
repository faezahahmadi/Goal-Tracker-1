import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import CategoryCard from "../components/CategoryCard";
import { useGoals } from "../context/GoalContext";
import { useLanguage } from "../context/LanguageContext";

export default function Categories() {
    const { goals } = useGoals();
    const { t } = useLanguage();
    const categories = [...new Set(goals.map(goal => goal.category))];
    const categoryData = categories.map(name => {
        const catGoals = goals.filter(g => g.category === name);
        const activeGoals = catGoals.filter(g => g.status == "Active").length;
        const completedGoals = catGoals.filter(g => g.status == "Completed").length;
        const avgProgress =
            catGoals.length === 0
                ? 0
                : Math.round(
                    catGoals.reduce((sum, g) => {
                        const progress = Number(g.progress) || 0;
                        const target = Number(g.target) || 1;
                        return sum + (progress / target * 100);
                    }, 0)
                    / catGoals.length);
        return {
            name, activeGoals, completedGoals, avgProgress
        };

    });
    return (
        <Container maxWidth="lg" sx={{ mt: 4, }}>
            <Box justifyContent="space-between" sx={{ mb: 1 }}  >
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600" >{t("categoryTitle")}</Typography>
                <Typography variant="body1" color="text.secondary">{t("categorySubtitle")}                </Typography>
            </Box>
            <Divider />
            <Grid container spacing={2} >
                {categoryData.map(cat => (
                    <Grid item xs={12} sm={6} md={4} key={cat.id}>
                        <CategoryCard
                            category={cat} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}