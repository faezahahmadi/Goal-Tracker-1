// Pure date helpers for the month-grid Calendar view (no external date library needed).

export function getMonthMatrix(year, month) {
    // month is 0-indexed. Returns an array of weeks, each an array of 7 Date|null cells.
    const firstOfMonth = new Date(year, month, 1);
    const startWeekday = firstOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
}

export function toDateKey(date) {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
    ).padStart(2, "0")}`;
}

export function isSameDay(a, b) {
    if (!a || !b) return false;
    return toDateKey(a) === toDateKey(b);
}

// Builds a map of dateKey -> array of events { type, goal } for a given month's goals.
export function buildEventsByDate(goals) {
    const map = {};
    const addEvent = (dateKey, event) => {
        if (!dateKey) return;
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push(event);
    };

    (goals || []).forEach((goal) => {
        if (goal.startDate) {
            addEvent(toDateKey(goal.startDate), { type: "start", goal });
        }
        if (goal.deadline) {
            addEvent(toDateKey(goal.deadline), { type: "deadline", goal });
        }
        (goal.logs || []).forEach((log) => {
            addEvent(toDateKey(log.date), { type: "progress", goal, value: log.value });
        });
    });

    return map;
}
