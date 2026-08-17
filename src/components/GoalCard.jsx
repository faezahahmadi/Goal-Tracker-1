import {
    Card, CardContent, Typography, Button, LinearProgress, Stack,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Chip,
    Divider,
    IconButton,
    Tooltip
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteButton from "../components/DeleteButton";
import PauseButton from "../components/PauseButton";
import ProgressButton from "../components/ProgressButton";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import { useState } from "react";
import EditButton from "./EditButton";
import EditGoalModal from "./goals/EditGoalModal";
import DeadlineChip from "./DeadlineChip";
import { useLanguage } from "../context/LanguageContext";
import { useCategories } from "../context/CategoryContext";
import { goalTypeOption } from "../Data/GoalOption";
import { exportGoalAsJson } from "../utils/exportGoal";

export default function GoalCard({ goal }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const { t } = useLanguage();
    const { getCategoryName, getCategoryColor } = useCategories();

    const { increaseProgress,
        togglePause,
        setGoals,
        startEditGoal, clearEditGoal } = useGoals();

    const handleEditGoal = () => {
        startEditGoal(goal);
        setOpenEdit(true);
    }
    const handleDeleteClick = (g) => {
        setSelectedGoal(g);
        setOpenDelete(true);
    }
    const handleDeleteConfirm = () => {
        setGoals(prev =>
            prev.filter(goal =>
                goal.id !== selectedGoal.id
            ));
        setOpenDelete(false);
        setSelectedGoal(null);
    }

    const navigate = useNavigate();
    const categoryColor = getCategoryColor(goal.category);

    return (
        <Card elevation={4}
            sx={{
                mb: 2,
                borderLeft: 4,
                borderLeftColor: categoryColor || "gray",
                borderTop: 1,
                width: "100%",
                borderTopColor: "orange",
                transition: "transform 0.15s, box-shadow 0.15s",
                "&:hover": { boxShadow: 8 },
            }}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                    <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, wordBreak: "break-word" }}>
                        {goal.title}
                    </Typography>
                    <Tooltip title="Export goal">
                        <IconButton
                            size="small"
                            onClick={() => exportGoalAsJson(goal)}
                            sx={{ flexShrink: 0 }}
                        >
                            <FileDownloadIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Typography color="text.secondary">
                    {getCategoryName(goal.category)}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap={"wrap"} useFlexGap sx={{ rowGap: 0.5 }}>
                    <Chip
                        size="small"
                        label={goal.status}
                        variant="outlined"
                        sx={{
                            borderRadius: 999,
                            fontWeight: 700,
                            textTransform: "capitalize",
                        }}>
                        {goal.status}
                    </Chip>
                    <Chip
                        size="small"
                        label={goalTypeOption[goal.goalType] || goal.goalType}
                        variant="outlined"
                        sx={{
                            borderRadius: 999,
                            fontWeight: 700,
                            textTransform: "capitalize",
                        }}>
                        {goal.goalType}
                    </Chip>
                    <DeadlineChip deadline={goal.deadline} />
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={(goal.progress / goal.target) * 100}
                    sx={{ my: 2, height: 8, borderRadius: 999 }}
                    color={goal.status === "Completed" ? "success" :
                        goal.status === "Paused" ? "warning"
                            : "primary"} />
                <Divider />
                <p>{((goal.progress / goal.target) * 100).toFixed(0)}%</p>

                <Typography>
                    {goal.progress}/{goal.target}
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ gap: 1, mt: 2 }}
                >
                    <ProgressButton
                        onClick={() => increaseProgress(goal.id, goal.target)}
                        disabled={goal.target === goal.progress} />

                    <PauseButton
                        status={goal.status}
                        onToggle={() => togglePause(goal.id)}
                        disabled={goal.status === "Completed"} />

                    <DeleteButton
                        onClick={() => handleDeleteClick(goal)} />
                </Stack>
                <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: 1, mt: 1.5 }}>
                    <EditButton
                        onClick={() => handleEditGoal()}
                    />
                    <Button variant="contained"
                        sx={{ flex: { xs: "1 1 auto", sm: "0 0 auto" } }}
                        onClick={() => navigate(`/goalsList/${goal.id}`)}>
                        {t("moreDetails")}
                    </Button>
                </Stack>
                <EditGoalModal
                    open={openEdit}
                    onClose={() => {
                        setOpenEdit(false)
                        clearEditGoal();
                    }}
                />
                <Dialog
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}>
                    <DialogTitle>{t("delete Goal")}</DialogTitle>
                    <DialogContent >Are you sure you want to delete {selectedGoal?.title}?</DialogContent>
                    <DialogActions>
                        <Button onClick={() =>
                            setOpenDelete(false)}>Cancel</Button>
                        <Button
                            color="error"
                            onClick={handleDeleteConfirm}>Delete</Button>
                    </DialogActions>
                </Dialog>



            </CardContent>
        </Card>
    )
}
