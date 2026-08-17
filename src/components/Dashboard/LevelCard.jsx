import { Box, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getLevelInfo } from "../../utils/points";

export default function LevelCard({ xp }) {
    const level = getLevelInfo(xp);

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 4,
                background: "linear-gradient(135deg, #1954d2 0%, #6a3fd0 100%)",
                color: "white",
                overflow: "hidden",
            }}
        >
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            bgcolor: "rgba(255,255,255,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <EmojiEventsIcon />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ opacity: 0.85 }}>
                            Level {level.level} · {level.title}
                        </Typography>
                        <Typography variant="h5" fontWeight={800}>
                            {level.totalXp} XP
                        </Typography>
                    </Box>
                </Stack>

                <Box sx={{ mt: 2 }}>
                    <LinearProgress
                        variant="determinate"
                        value={level.progressPercent}
                        sx={{
                            height: 8,
                            borderRadius: 999,
                            bgcolor: "rgba(255,255,255,0.25)",
                            "& .MuiLinearProgress-bar": {
                                bgcolor: "white",
                                borderRadius: 999,
                            },
                        }}
                    />
                    <Typography variant="caption" sx={{ opacity: 0.85, mt: 0.5, display: "block" }}>
                        {level.xpRemaining} XP to level {level.level + 1}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
