import { Box, Card, CardContent, Chip, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryCard({ category, onDelete }) {
    const { t } = useLanguage();
    return (
        <Card sx={{ p: 2, borderTop: 4, borderColor: category.color || "gray", height: "100%" }} >
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: category.color }} />
                        <Typography variant="h6">
                            {t(category.name)}
                        </Typography>
                    </Stack>
                    {onDelete && (
                        <Tooltip title="Delete category">
                            <IconButton size="small" onClick={onDelete}>
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
                <Stack direction={"row"} spacing={1} mb={1.5} mt={1} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
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
