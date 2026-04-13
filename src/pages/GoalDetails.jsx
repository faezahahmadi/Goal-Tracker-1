import {
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    Box,
    Chip,
    LinearProgress,
    Button,
} from "@mui/material";
import PauseButton from "../components/PauseButton";
import ProgressButton from "../components/ProgressButton";
import EditButton from "../components/EditButton";
import EditGoalModal from "../components/EditButton";

import TimeInfo from "../components/goals/TimeInfo";
import StatChip from "../components/goals/StatChip";
import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import { useGoals } from "../context/GoalContext";
import { useState } from "react";

const formatDate = (date) => {
    if (!date) return "-";
    if (date.toDate) return date.toDate().toLocaleDateString();
    if (date instanceof Date) return date.toLocaleDateString();
    return String(date);
};

export default function GoalDetails() {
    const { goals } = useGoals();
    const navigate = useNavigate();
    const { id } = useParams();
    const [openEdit, setOpenEdit] = useState(false);


    const { increaseProgress,
        togglePause,
        setGoals, startEditGoal } = useGoals();

    const handleEditGoal = () => {
        startEditGoal(goal);
        setOpenEdit(true);
    }

    const goal = Array.isArray(goals)
        ? goals.find((g) => String(g.id) === id)
        : null;

    if (!goal) {
        return <Typography variant="h5">The goal is not found</Typography>;
    }

    const progressPercent =
        goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={7} sx={{ p: 3 }}>
                <Card>
                    <CardContent>
                        <Stack spacing={1}>
                            <Typography variant="h4" fontWeight={800}>
                                {goal.title}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                <Chip size="small" label={String(goal.category)} />
                                <Chip size="small" label={String(goal.type)} />
                                <Chip size="small" label={String(goal.status)} />
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={6} md={3}>
                        <StatChip
                            icon={<InsightsRoundedIcon fontSize="small" />}
                            label="Progress"
                            value={`${goal.progress}/${goal.target}`}
                        />
                    </Grid>
                </Grid>

                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography fontWeight={600}>Progress Overview</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {goal.progress} / {goal.target}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progressPercent}
                            sx={{ my: 2 }}
                            color={goal.progress === goal.target ? "success" : "primary"}
                        />
                    </CardContent>
                </Card>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={12} md={5}>
                        <Typography fontWeight={600}>Goal Controls</Typography>

                        <Stack direction="row"
                            spacing={1} mt={2}>
                            <ProgressButton
                                onClick={() => increaseProgress(goal.id, goal.target)}
                                disabled={goal.target === goal.progress} />

                            <PauseButton
                                status={goal.status}
                                onToggle={() => togglePause(goal.id)}
                                disabled={goal.status === "Completed"} />

                            <EditButton
                                onClick={() => handleEditGoal()}
                            />
                            <EditGoalModal
                                open={openEdit}
                                onClose={() => setOpenEdit(false)} />

                        </Stack>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={12} md={5}>
                        <Typography fontWeight={600}>Schedule</Typography>
                        <Stack spacing={1.2} mt={1}>
                            <TimeInfo
                                icon={<CalendarMonthRoundedIcon fontSize="small" color="action" />}
                                label="Created At: "
                                value={formatDate(goal.createdAt)} />
                            <TimeInfo
                                icon={<CalendarMonthRoundedIcon fontSize="small" color="action" />}
                                label="Start Date: "
                                value={formatDate(goal.startDate)}
                            />
                            <TimeInfo
                                icon={<CalendarMonthRoundedIcon fontSize="small" color="action" />}
                                label="End Date: "
                                value={formatDate(goal.endDate)}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
