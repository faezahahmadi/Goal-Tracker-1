import { Box, Grid, Stack } from "@mui/material";
import MetricCard from "./MetricCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useLanguage } from "../../context/LanguageContext";


export default function DashboardTopSummary({ totalCompleted, streak, xp, overallProgress }) {
    const { t } = useLanguage();
    const metrics = [
        {
            label: t("completedChip"),
            title: t("completed"),
            value: totalCompleted,
            icon: <CheckCircleIcon
                color="success"
                fontSize="large" />,
            color: "rgb(87, 153, 43)"

        }, {
            label: t("consecutiveDays"),
            title: t("streakChip"),
            value: streak,
            icon: <WhatshotIcon
                fontSize="large"
                color="warning" />,
            color: "rgb(233, 139, 17)"
        }, {
            label: t("progress"),
            title: t("XP"),
            value: xp,
            icon: <EmojiEventsIcon
                color="info"
                fontSize="large" />,
            color: "rgb(14, 180, 166)"
        }, {

            title: t("overallProgress"),
            value: overallProgress,
            icon: <TrendingUpIcon
                fontSize="large"
                color="secondary" />,
            color: "rgb(170, 15, 124)"
        }
    ]

    return (

        <Grid container spacing={2}>
            {metrics.map((metric, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <MetricCard
                        title={metric.title}
                        value={metric.value}
                        icon={metric.icon}
                        color={metric.color}
                        label={metric.label} />
                </Grid>

            ))}
        </Grid>
    )
}