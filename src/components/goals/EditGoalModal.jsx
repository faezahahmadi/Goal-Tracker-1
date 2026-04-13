import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useGoals } from "../../context/GoalContext";
import CloseIcon from "@mui/icons-material/Close";
import CreateGoal from "../../pages/CreateGoal";
export default function EditGoalModal({ open, onClose }) {
    const { editGoal } = useGoals();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="paper">
            <DialogTitle>Edit Goal</DialogTitle>
            <IconButton
                onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogContent
                dividers
                sx={{ minHeight: "400px", maxHeight: "80vh" }}>
                <CreateGoal onClose={onClose}
                    isModal={true}
                />
            </DialogContent>


        </Dialog>
    )
}