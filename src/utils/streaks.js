// All streak / completion-rate math lives here so it can be reused by the
// Dashboard, GoalDetails, and Analytics screens without drifting out of sync.
const DAY_MS = 1000 * 60 * 60 * 24;

function toDateOnly(str) {
    const d = new Date(str);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function collectActiveDates(goals) {
    const dates = new Set();
    (goals || []).forEach((goal) => {
        (goal.logs || []).forEach((log) => {
            if (log?.date) dates.add(log.date);
        });
    });
    return [...dates].sort();
}

// Current streak: consecutive days (ending today or yesterday) with at least one logged action.
export function getCurrentStreak(goals) {
    const activeDates = new Set(collectActiveDates(goals));
    if (activeDates.size === 0) return 0;

    const today = new Date();
    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // If nothing happened today, the streak can still be "alive" through yesterday.
    const todayKey = cursor.toISOString().split("T")[0];
    if (!activeDates.has(todayKey)) {
        cursor = new Date(cursor.getTime() - DAY_MS);
    }

    let streak = 0;
    while (activeDates.has(cursor.toISOString().split("T")[0])) {
        streak++;
        cursor = new Date(cursor.getTime() - DAY_MS);
    }
    return streak;
}

// Longest streak ever recorded across the goal's full history.
export function getLongestStreak(goals) {
    const activeDates = collectActiveDates(goals);
    if (activeDates.length === 0) return 0;

    let longest = 1;
    let current = 1;

    for (let i = 1; i < activeDates.length; i++) {
        const prev = toDateOnly(activeDates[i - 1]);
        const curr = toDateOnly(activeDates[i]);
        const diffDays = Math.round((curr - prev) / DAY_MS);

        if (diffDays === 1) {
            current++;
        } else if (diffDays > 1) {
            current = 1;
        }
        longest = Math.max(longest, current);
    }

    return longest;
}

// % of the last N days (including today) that had at least one logged action.
function completionRate(goals, days) {
    const activeDates = new Set(collectActiveDates(goals));
    if (activeDates.size === 0) return 0;

    const today = new Date();
    let activeCount = 0;

    for (let i = 0; i < days; i++) {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        if (activeDates.has(d.toISOString().split("T")[0])) activeCount++;
    }

    return Math.round((activeCount / days) * 100);
}

export function getWeeklyCompletion(goals) {
    return completionRate(goals, 7);
}

export function getMonthlyCompletion(goals) {
    return completionRate(goals, 30);
}

export function getStreakStats(goals) {
    return {
        currentStreak: getCurrentStreak(goals),
        longestStreak: getLongestStreak(goals),
        weeklyCompletion: getWeeklyCompletion(goals),
        monthlyCompletion: getMonthlyCompletion(goals),
    };
}

// Daily activity counts for the last N days - powers the Analytics trend chart.
export function getDailyActivity(goals, days = 30) {
    const counts = {};
    (goals || []).forEach((goal) => {
        (goal.logs || []).forEach((log) => {
            if (!log?.date) return;
            counts[log.date] = (counts[log.date] || 0) + (log.value || 1);
        });
    });

    const today = new Date();
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const key = d.toISOString().split("T")[0];
        result.push({
            date: key,
            label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
            count: counts[key] || 0,
        });
    }
    return result;
}
