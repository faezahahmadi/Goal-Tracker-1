import { Add } from "@mui/icons-material";
import { List } from "@mui/icons-material";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext";

export default function QuickActions() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    return (
        <Card
            sx={{
                borderRadius: 2,
                borderLeft: "6px solid",
                borderColor: "orangered",
                boxShadow: 4,
                height: "100%",
                width: "100%",
                justifyContent: "space-between",

            }}>
            <CardContent >
                <Typography sx={{ mb: 0.8 }} variant="body2" color="orangered" fontWeight={"bold"}>
                    {t("quickActions")}
                </Typography>
                <Stack>
                    <Chip
                        sx={{ mb: 1 }}
                        label={t("newGoal")}
                        value="New Goal"
                        icon={<Add />}
                        color="orangered"
                        onClick={() => navigate("/createGoal")} />
                    <Chip
                        label={t("viewAllGoals")}
                        value="View All GOals"
                        icon={<List />}
                        onClick={() => navigate("/goalsList")} />

                </Stack>
            </CardContent>

        </Card>

    )
}