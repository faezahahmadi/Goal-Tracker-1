import { Dialog, DialogContent, Box, Typography, Button, Fade } from "@mui/material";
import { useGoals } from "../context/GoalContext";
import { XP_COMPLETION_BONUS } from "../utils/points";

// Mounted once in the Layout - watches celebrateGoal in GoalContext and pops
// up automatically the instant any goal (from any page) hits 100%.
export default function GoalCompletionModal() {
    const { celebrateGoal, clearCelebration } = useGoals();

    const open = Boolean(celebrateGoal);
    const completedDate = celebrateGoal?.completedAt
        ? new Date(celebrateGoal.completedAt)
        : new Date();

    return (
        <Dialog
            open={open}
            onClose={clearCelebration}
            maxWidth="xs"
            fullWidth
            TransitionComponent={Fade}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    textAlign: "center",
                    background:
                        "linear-gradient(160deg, #fff8e1 0%, #ffffff 55%)",
                    overflow: "hidden",
                },
            }}
        >
            <DialogContent sx={{ py: 5, px: 3 }}>
                <Typography sx={{ fontSize: "3.5rem", lineHeight: 1 }}>🎉</Typography>
                <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{ mt: 2, letterSpacing: 0.5, color: "#c98a00" }}
                >
                    GOAL COMPLETED!
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ mt: 2 }}>
                    {celebrateGoal?.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Completed{" "}
                    {completedDate.toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>

                <Box
                    sx={{
                        mt: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2.5,
                        py: 1,
                        borderRadius: 999,
                        bgcolor: "rgba(255, 193, 7, 0.18)",
                        color: "#8a6100",
                        fontWeight: 800,
                    }}
                >
                    <span>🏆</span>
                    <span>+{XP_COMPLETION_BONUS} XP</span>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" size="large" onClick={clearCelebration}>
                        Nice!
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
