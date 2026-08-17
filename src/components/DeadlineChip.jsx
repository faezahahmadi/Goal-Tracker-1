import { Chip } from "@mui/material";
import { getDeadlineStatus } from "../utils/deadline";

// Deadline status (Healthy / Approaching / Urgent / Overdue) is always
// derived live from today's date - nothing here is hard-coded.
export default function DeadlineChip({ deadline, size = "small" }) {
    if (!deadline) return null;

    const status = getDeadlineStatus(deadline);
    if (status.key === "none") return null;

    return (
        <Chip
            size={size}
            variant="outlined"
            color={status.color}
            label={`${status.emoji} ${status.label}`}
            sx={{ borderRadius: 999, fontWeight: 700 }}
        />
    );
}
