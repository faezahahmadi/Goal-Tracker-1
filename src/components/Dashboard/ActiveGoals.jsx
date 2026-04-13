import { Box, Grid, Typography } from "@mui/material";
import { useGoals } from "../../context/GoalContext";
import GoalCard from "../GoalCard";
import { useLanguage } from "../../context/LanguageContext";

export default function ActiveGoals() {
    const { goals } = useGoals();
    const activeGoals = goals.filter(goal => goal.status === "Active");
    const { t } = useLanguage();

    return (
        <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3, mt: 5, mb: 4, borderTop: 4, borderColor: "blueviolet" }}>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {t("activeGoals")}
            </Typography>

            <Grid container spacing={2} mt={1}>
                {activeGoals.map((goal) => (
                    <Grid item xs={12} key={goal.id}>
                        <GoalCard
                            goal={goal} />
                    </Grid>
                ))}

            </Grid>

        </Box>
    )

}


