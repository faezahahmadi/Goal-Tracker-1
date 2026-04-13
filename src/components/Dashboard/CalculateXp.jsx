const calculateXP = (goals) => {
    if (!goals || goals.length === 0) return 0;

    let xp = 0;

    goals.forEach(goal => {
        if (goal.logs && goal.logs.length > 0) {
            goal.logs.forEach(log => {
                xp += log.value * 10;
            });
        }

        //  Completion bonus
        if (goal.status === "Completed") {
            xp += 40;
        }
    });

    return xp;
};

export default calculateXP;
