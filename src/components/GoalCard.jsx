import {
    Card, CardContent, Typography, Button, LinearProgress, Stack,
    Grid, Dialog, DialogTitle, DialogContent, DialogActions,
    Chip,
    Divider
} from "@mui/material";
import DeleteButton from "../components/DeleteButton";
import PauseButton from "../components/PauseButton";
import ProgressButton from "../components/ProgressButton";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import { useCallback, useState } from "react";
import EditButton from "./EditButton";
import EditGoalModal from "./goals/EditGoalModal";
import { useLanguage } from "../context/LanguageContext";
import { categoryOption, goalTypeOption } from "../Data/GoalOption";

export default function GoalCard({ goal }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const { t } = useLanguage();


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

    return (
        <Card elevation={4}
            sx={{
                mb: 2,
                borderLeft: 4,
                borderLeftColor: "gray",
                borderTop: 1,
                width: "100%",
                borderTopColor: "orange"
            }}>
            <CardContent sx={{ p: { xs: 1.2, sm: 2 } }}>
                <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    {goal.title}
                </Typography>
                <Typography color="text.secondary">
                    {categoryOption[goal.category] || goal.category}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap={"wrap"}>
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
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={(goal.progress / goal.target) * 100}
                    sx={{ my: 2 }}
                    color={goal.status === "Completed" ? "success" :
                        goal.status === "Paused" ? "warning"
                            : "primary"} />
                <Divider />
                <p>{((goal.progress / goal.target) * 100).toFixed(0)}%</p>

                <Typography>
                    {goal.progress}/{goal.target}
                </Typography>

                <Stack direction="row"
                    spacing={1} mt={2} sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>

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
                <Stack direction="row" spacing={1} mt={2} flexWrap={"wrap"}>
                    <EditButton
                        onClick={() => handleEditGoal()}
                    />
                    <Button variant="contained"
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