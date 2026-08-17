import { useMemo, useState } from "react";
import {
    Box,
    Container,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
    Chip,
    Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import { useCategories } from "../context/CategoryContext";
import { getMonthMatrix, toDateKey, buildEventsByDate } from "../utils/calendarUtils";
import { useLanguage } from "../context/LanguageContext";

const EVENT_STYLES = {
    start: { color: "#1954d2", label: "Start" },
    deadline: { color: "#c62828", label: "Deadline" },
    progress: { color: "#2e7d32", label: "Progress" },
};

export default function CalendarView() {
    const { goals } = useGoals();
    const { getCategoryColor } = useCategories();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const today = useMemo(() => new Date(), []);
    const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const weeks = useMemo(
        () => getMonthMatrix(cursor.getFullYear(), cursor.getMonth()),
        [cursor]
    );
    const eventsByDate = useMemo(() => buildEventsByDate(goals), [goals]);

    const monthLabel = cursor.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    const goToMonth = (delta) => {
        setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
    };
    const goToToday = () => setCursor(new Date(today.getFullYear(), today.getMonth(), 1));

    const weekdayLabels = useMemo(() => {
        const base = new Date(2024, 0, 7); // a Sunday
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(base);
            d.setDate(base.getDate() + i);
            return d.toLocaleDateString(undefined, { weekday: "short" });
        });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 1 }}>
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600">
                    Calendar
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    See your goal start dates, deadlines, and logged progress by day.
                </Typography>
            </Box>
            <Divider />

            <Paper elevation={7} sx={{ p: { xs: 1.5, sm: 3 }, mt: 5, overflowX: "auto" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        {monthLabel}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Today">
                            <IconButton onClick={goToToday} size="small">
                                <TodayIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <IconButton onClick={() => goToMonth(-1)} size="small">
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton onClick={() => goToMonth(1)} size="small">
                            <ChevronRightIcon />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
                    {Object.entries(EVENT_STYLES).map(([key, style]) => (
                        <Stack key={key} direction="row" spacing={0.7} alignItems="center">
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    bgcolor: style.color,
                                }}
                            />
                            <Typography variant="caption" color="text.secondary">
                                {style.label}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>

                <Box sx={{ minWidth: 630 }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0.5, mb: 0.5 }}>
                        {weekdayLabels.map((label) => (
                            <Typography
                                key={label}
                                variant="caption"
                                fontWeight={700}
                                color="text.secondary"
                                textAlign="center"
                            >
                                {label}
                            </Typography>
                        ))}
                    </Box>

                    {weeks.map((week, wi) => (
                        <Box
                            key={wi}
                            sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0.5, mb: 0.5 }}
                        >
                            {week.map((date, di) => {
                                const key = toDateKey(date);
                                const dayEvents = (date && eventsByDate[key]) || [];
                                const isToday = date && toDateKey(date) === toDateKey(today);

                                return (
                                    <Paper
                                        key={di}
                                        variant="outlined"
                                        sx={{
                                            minHeight: 92,
                                            p: 0.7,
                                            bgcolor: date ? "background.paper" : "action.hover",
                                            borderColor: isToday ? "primary.main" : "divider",
                                            borderWidth: isToday ? 2 : 1,
                                            opacity: date ? 1 : 0.4,
                                        }}
                                    >
                                        {date && (
                                            <>
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={isToday ? 800 : 600}
                                                    color={isToday ? "primary.main" : "text.primary"}
                                                >
                                                    {date.getDate()}
                                                </Typography>
                                                <Stack spacing={0.3} sx={{ mt: 0.4 }}>
                                                    {dayEvents.slice(0, 3).map((ev, i) => (
                                                        <Tooltip
                                                            key={i}
                                                            title={`${EVENT_STYLES[ev.type].label}: ${ev.goal.title}`}
                                                        >
                                                            <Chip
                                                                size="small"
                                                                label={ev.goal.title}
                                                                onClick={() =>
                                                                    navigate(`/goalsList/${ev.goal.id}`)
                                                                }
                                                                sx={{
                                                                    height: 18,
                                                                    fontSize: "0.62rem",
                                                                    bgcolor: EVENT_STYLES[ev.type].color,
                                                                    color: "white",
                                                                    cursor: "pointer",
                                                                    "& .MuiChip-label": { px: 0.7 },
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                    {dayEvents.length > 3 && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            +{dayEvents.length - 3} more
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </>
                                        )}
                                    </Paper>
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Container>
    );
}
