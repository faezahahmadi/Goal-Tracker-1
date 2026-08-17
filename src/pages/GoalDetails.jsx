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
    IconButton,
    Tooltip,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PauseButton from "../components/PauseButton";
import ProgressButton from "../components/ProgressButton";
import EditButton from "../components/EditButton";
import EditGoalModal from "../components/goals/EditGoalModal";
import DeadlineChip from "../components/DeadlineChip";
import NotesSection from "../components/goals/NotesSection";

import TimeInfo from "../components/goals/TimeInfo";
import StatChip from "../components/goals/StatChip";
import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import { useGoals } from "../context/GoalContext";
import { useCategories } from "../context/CategoryContext";
import { useState } from "react";
import { goalTypeOption } from "../Data/GoalOption";
import { exportGoalAsJson } from "../utils/exportGoal";

const formatDate = (date) => {
    if (!date) return "-";
    if (date.toDate) return date.toDate().toLocaleDateString();
    if (date instanceof Date) return date.toLocaleDateString();
    return String(date);
};

export default function GoalDetails() {
    const { goals } = useGoals();
    const { getCategoryName } = useCategories();
    const navigate = useNavigate();
    const { id } = useParams();
    const [openEdit, setOpenEdit] = useState(false);


    const { increaseProgress,
        togglePause,
        setGoals, startEditGoal } = useGoals();

    const goal = Array.isArray(goals)
        ? goals.find((g) => String(g.id) === id)
        : null;

    const handleEditGoal = () => {
        startEditGoal(goal);
        setOpenEdit(true);
    }

    if (!goal) {
        return <Typography variant="h5">The goal is not found</Typography>;
    }

    const progressPercent =
        goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={7} sx={{ p: { xs: 1.5, sm: 3 } }}>
                <Card>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                            <Stack spacing={1} sx={{ minWidth: 0 }}>
                                <Typography variant="h4" fontWeight={800} sx={{ wordBreak: "break-word" }}>
                                    {goal.title}
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
                                    <Chip size="small" label={getCategoryName(goal.category)} />
                                    <Chip size="small" label={goalTypeOption[goal.goalType] || goal.goalType} />
                                    <Chip size="small" label={String(goal.status)} />
                                    <DeadlineChip deadline={goal.deadline} />
                                </Stack>
                            </Stack>
                            <Tooltip title="Export goal">
                                <IconButton onClick={() => exportGoalAsJson(goal)} sx={{ flexShrink: 0 }}>
                                    <FileDownloadIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </CardContent>
                </Card>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatChip
                            icon={<InsightsRoundedIcon fontSize="small" />}
                            label="Progress"
                            value={`${goal.progress}/${goal.target}`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatChip
                            icon={<FlagRoundedIcon fontSize="small" />}
                            label="Notes"
                            value={(goal.notes || []).length}
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
                            sx={{ my: 2, height: 8, borderRadius: 999 }}
                            color={goal.progress === goal.target ? "success" : "primary"}
                        />
                    </CardContent>
                </Card>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={5}>
                        <Typography fontWeight={600}>Goal Controls</Typography>

                        <Stack direction="row"
                            flexWrap="wrap"
                            useFlexGap
                            sx={{ gap: 1, mt: 2 }}>
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
                        </Stack>
                        <EditGoalModal
                            open={openEdit}
                            onClose={() => setOpenEdit(false)} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={5}>
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
                                label="Deadline: "
                                value={formatDate(goal.deadline)}
                            />
                        </Stack>
                    </Grid>
                </Grid>

                <NotesSection goal={goal} />
            </Paper>
        </Container>
    );
}
