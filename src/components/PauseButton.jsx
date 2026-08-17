import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useLanguage } from "../context/LanguageContext";


export default function PauseButton({ status, onToggle }) {
    const { t } = useLanguage()

    const isPaused = status === "Paused";
    return (
        <Button variant="contained"
            color={status === "Paused" ? "warning" : "info"}
            size="small"
            disabled={status === "Completed"}
            onClick={onToggle}
            sx={{ flex: "1 1 auto", minWidth: 110 }}
            startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}>
            {isPaused ? t("resume") : t("pause")}
        </Button>
    )
}
