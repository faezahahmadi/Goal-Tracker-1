import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryCard({ category }) {
    const { t } = useLanguage();
    return (
        <Card sx={{ p: 2 }} >
            <CardContent>
                <Typography variant="h6">
                    {t(category.name)}
                </Typography>
                <Stack direction={"row"} spacing={1} mb={1.5} >
                    <Chip
                        label={`${t("active")}: ${category.activeGoals}`}
                        color="info"
                        size="small"
                    />
                    <Chip
                        label={`${t("completed")}: ${category.completedGoals}`}
                        color="success"
                        size="small"
                    />
                </Stack>
                <LinearProgress variant="determinate"
                    value={category.avgProgress} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {category.avgProgress}% {t("completed")}
                </Typography>
            </CardContent>
        </Card>

    )
}