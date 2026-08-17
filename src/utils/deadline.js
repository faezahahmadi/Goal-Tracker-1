// Deadline status is always calculated live from the current date - never hard-coded.
const DAY_MS = 1000 * 60 * 60 * 24;

export function getDaysRemaining(deadline) {
    if (!deadline) return null;
    const target = new Date(deadline);
    if (isNaN(target.getTime())) return null;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());

    return Math.round((startOfTarget - startOfToday) / DAY_MS);
}

// Returns a full status descriptor for a given deadline, computed against "now".
export function getDeadlineStatus(deadline) {
    const daysRemaining = getDaysRemaining(deadline);

    if (daysRemaining === null) {
        return {
            key: "none",
            label: "No deadline",
            emoji: "",
            color: "default",
            daysRemaining: null,
        };
    }

    if (daysRemaining < 0) {
        const overdueBy = Math.abs(daysRemaining);
        return {
            key: "overdue",
            label: `${overdueBy} day${overdueBy === 1 ? "" : "s"} overdue`,
            emoji: "⚠️",
            color: "error",
            daysRemaining,
        };
    }

    if (daysRemaining <= 3) {
        return {
            key: "urgent",
            label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining`,
            emoji: "🔴",
            color: "error",
            daysRemaining,
        };
    }

    if (daysRemaining <= 7) {
        return {
            key: "approaching",
            label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining`,
            emoji: "🟡",
            color: "warning",
            daysRemaining,
        };
    }

    return {
        key: "healthy",
        label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining`,
        emoji: "🟢",
        color: "success",
        daysRemaining,
    };
}
