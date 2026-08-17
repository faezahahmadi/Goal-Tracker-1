// Aggregation helpers that feed the Recharts-powered Analytics page.

export function getCategoryBreakdown(goals, categories) {
    const nameById = {};
    (categories || []).forEach((c) => (nameById[c.id] = c.name));

    const byCategory = {};
    (goals || []).forEach((g) => {
        const key = g.category || "uncategorized";
        if (!byCategory[key]) {
            byCategory[key] = { totalProgress: 0, totalTarget: 0, count: 0 };
        }
        byCategory[key].totalProgress += Number(g.progress) || 0;
        byCategory[key].totalTarget += Number(g.target) || 1;
        byCategory[key].count += 1;
    });

    return Object.entries(byCategory).map(([id, data]) => ({
        category: nameById[id] || id,
        progress: data.totalTarget > 0
            ? Math.round((data.totalProgress / data.totalTarget) * 100)
            : 0,
        goals: data.count,
    }));
}

export function getStatusBreakdown(goals) {
    const counts = { Active: 0, Paused: 0, Completed: 0 };
    (goals || []).forEach((g) => {
        if (counts[g.status] !== undefined) counts[g.status] += 1;
        else counts[g.status] = (counts[g.status] || 0) + 1;
    });
    return Object.entries(counts)
        .filter(([, value]) => value > 0)
        .map(([name, value]) => ({ name, value }));
}

export function getGoalTypeBreakdown(goals, goalTypeOption) {
    const counts = {};
    (goals || []).forEach((g) => {
        const key = g.goalType || "unknown";
        counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([key, value]) => ({
        name: goalTypeOption?.[key] || key,
        value,
    }));
}
