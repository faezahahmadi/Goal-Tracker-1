// Central XP / leveling system.
// XP sources:
//   - +10 XP for every unit of progress logged
//   - +500 XP bonus the moment a goal is fully completed
//   - +5 XP per day of the user's current streak (keeps daily use rewarding)
export const XP_PER_PROGRESS = 10;
export const XP_COMPLETION_BONUS = 500;
export const XP_PER_STREAK_DAY = 5;

export function calculateXP(goals, currentStreak = 0) {
    if (!goals || goals.length === 0) return 0;

    let xp = 0;
    goals.forEach((goal) => {
        (goal.logs || []).forEach((log) => {
            xp += (log.value || 0) * XP_PER_PROGRESS;
        });
        if (goal.status === "Completed") {
            xp += XP_COMPLETION_BONUS;
        }
    });

    xp += currentStreak * XP_PER_STREAK_DAY;

    return xp;
}

const LEVEL_TITLES = [
    "Newcomer",
    "Beginner",
    "Achiever",
    "Consistent",
    "Motivated",
    "Disciplined",
    "Pro",
    "Expert",
    "Master",
    "Legend",
];

// XP required to go from level N to level N+1 grows so higher levels feel earned.
function xpForLevel(level) {
    return 200 + (level - 1) * 150;
}

export function getLevelInfo(xp = 0) {
    let level = 1;
    let xpConsumed = 0;
    let needed = xpForLevel(level);

    while (xp >= xpConsumed + needed) {
        xpConsumed += needed;
        level++;
        needed = xpForLevel(level);
    }

    const xpIntoLevel = xp - xpConsumed;
    const progressPercent = Math.min(100, Math.round((xpIntoLevel / needed) * 100));
    const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];

    return {
        level,
        title,
        totalXp: xp,
        xpIntoLevel,
        xpForNextLevel: needed,
        xpRemaining: needed - xpIntoLevel,
        progressPercent,
    };
}
