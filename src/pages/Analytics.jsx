import { useMemo } from "react";
import { Box, Container, Divider, Grid, Paper, Typography, useTheme } from "@mui/material";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    Legend,
} from "recharts";
import { useGoals } from "../context/GoalContext";
import { useCategories } from "../context/CategoryContext";
import { goalTypeOption } from "../Data/GoalOption";
import {
    getCategoryBreakdown,
    getStatusBreakdown,
    getGoalTypeBreakdown,
} from "../utils/analytics";
import { getDailyActivity } from "../utils/streaks";
import StatChip from "../components/goals/StatChip";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const STATUS_COLORS = { Active: "#1954d2", Paused: "#ef6c00", Completed: "#2e7d32" };
const PIE_COLORS = ["#1954d2", "#2e7d32", "#ef6c00", "#8e24aa", "#c62828", "#00838f"];

export default function Analytics() {
    const { goals, streakStats } = useGoals();
    const { categories } = useCategories();
    const theme = useTheme();

    const categoryData = useMemo(
        () => getCategoryBreakdown(goals, categories),
        [goals, categories]
    );
    const statusData = useMemo(() => getStatusBreakdown(goals), [goals]);
    const typeData = useMemo(
        () => getGoalTypeBreakdown(goals, goalTypeOption),
        [goals]
    );
    const dailyActivity = useMemo(() => getDailyActivity(goals, 30), [goals]);

    const gridColor = theme.palette.divider;
    const textColor = theme.palette.text.secondary;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 1 }}>
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600">
                    Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    A closer look at your streaks, categories, and activity trends.
                </Typography>
            </Box>
            <Divider />

            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={6} md={3}>
                    <StatChip
                        icon={<WhatshotIcon color="warning" />}
                        label="Current Streak"
                        value={`${streakStats.currentStreak} days`}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatChip
                        icon={<EmojiEventsIcon color="secondary" />}
                        label="Longest Streak"
                        value={`${streakStats.longestStreak} days`}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatChip
                        icon={<CalendarViewWeekIcon color="info" />}
                        label="Weekly Completion"
                        value={`${streakStats.weeklyCompletion}%`}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatChip
                        icon={<CalendarMonthIcon color="success" />}
                        label="Monthly Completion"
                        value={`${streakStats.monthlyCompletion}%`}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={7}>
                    <Paper elevation={4} sx={{ p: 2, height: { xs: 360, md: 520 }, display: 'flex', flexDirection: 'column' }}>
                        <Typography fontWeight={700} sx={{ mb: 1 }}>
                            Activity - Last 30 Days
                        </Typography>
                        <Box sx={{ flex: 1, minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dailyActivity} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1954d2" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#1954d2" stopOpacity={0.03} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                    <XAxis
                                        dataKey="label"
                                        tick={{ fontSize: 11, fill: textColor }}
                                        interval={4}
                                    />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: textColor }} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#1954d2"
                                        fill="url(#activityFill)"
                                        name="Actions logged"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper elevation={4} sx={{ p: 2, height: { xs: 360, md: 520 }, display: 'flex', flexDirection: 'column' }}>
                        <Typography fontWeight={700} sx={{ mb: 1 }}>
                            Goals by Status
                        </Typography>
                        <Box sx={{ flex: 1, minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={'30%'}
                                        outerRadius={'55%'}
                                        paddingAngle={3}
                                    >
                                        {statusData.map((entry, i) => (
                                            <Cell
                                                key={entry.name}
                                                fill={STATUS_COLORS[entry.name] || PIE_COLORS[i % PIE_COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
                <Grid item xs={12} md={7}>
                    <Paper elevation={4} sx={{ p: 2, height: { xs: 360, md: 520 }, display: 'flex', flexDirection: 'column' }}>
                        <Typography fontWeight={700} sx={{ mb: 1 }}>
                            Progress by Category (%)
                        </Typography>
                        <Box sx={{ flex: 1, minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                    <XAxis dataKey="category" tick={{ fontSize: 12, fill: textColor }} />
                                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: textColor }} />
                                    <Tooltip />
                                    <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                                        {categoryData.map((entry, i) => (
                                            <Cell key={entry.category} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper elevation={4} sx={{ p: 2, height: { xs: 360, md: 520 }, display: 'flex', flexDirection: 'column' }}>
                        <Typography fontWeight={700} sx={{ mb: 1 }}>
                            Goals by Type
                        </Typography>
                        <Box sx={{ flex: 1, minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={typeData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={'55%'}
                                        label
                                    >
                                        {typeData.map((entry, i) => (
                                            <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
