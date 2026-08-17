// Exports a single goal (including its logs & notes) as a downloadable JSON file.
export function exportGoalAsJson(goal) {
    const payload = {
        ...goal,
        exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const safeName = (goal.title || "goal")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeName || "goal"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}
