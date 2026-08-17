import intialGoals from "../Data/Data";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { makeId } from "../utils/id";
import { getStreakStats } from "../utils/streaks";
import { calculateXP } from "../utils/points";

const GoalsContext = createContext();

const STORAGE_KEY = "goals";

function reviveGoal(g) {
    return {
        notes: [],
        deadline: null,
        logs: [],
        ...g,
        startDate: g.startDate ? new Date(g.startDate) : null,
        createdAt: g.createdAt ? new Date(g.createdAt) : new Date(),
        id: String(g.id),
    };
}

export function GoalsProvider({ children }) {
    const [goals, setGoals] = useState([]);
    const [editGoal, setEditGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    // Set whenever a goal crosses 100% so the app can show a celebration modal
    // from a single place (Layout) no matter where the action happened.
    const [celebrateGoal, setCelebrateGoal] = useState(null);

    // Load once on mount: prefer whatever is already saved in localStorage,
    // otherwise fall back to the seeded sample data.
    useEffect(() => {
        const stored = loadFromStorage(STORAGE_KEY, null);
        if (stored && Array.isArray(stored) && stored.length > 0) {
            setGoals(stored.map(reviveGoal));
        } else {
            setGoals(intialGoals.map(reviveGoal));
        }
        setLoading(false);
    }, []);

    // Persist any change to goals so nothing is lost on refresh.
    useEffect(() => {
        if (!loading) {
            saveToStorage(STORAGE_KEY, goals);
        }
    }, [goals, loading]);

    const startEditGoal = (goal) => {
        setEditGoal(goal);
    };
    const clearEditGoal = () => {
        setEditGoal(null);
    };
    const updateGoal = (updatedGoal) => {
        setGoals((prev) =>
            prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
        );
    };

    //  Add Goal
    const addGoal = (goalData) => {
        const newGoal = {
            id: makeId("goal"),
            ...goalData,
            deadline: goalData.deadline || null,
            progress: 0,
            target: Number(goalData.target) || 1,
            status: "Active",
            logs: [],
            notes: [],
            createdAt: new Date(),
            xp: 0,
        };

        setGoals((prev) => [...prev, newGoal]);
        return newGoal;
    };

    //  Increase Progress
    const increaseProgress = (id) => {
        const today = new Date().toISOString().split("T")[0];
        let completedGoal = null;

        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id !== id) return goal;

                const logs = goal.logs || [];
                const existingLog = logs.find((log) => log.date === today);

                let updatedLogs;
                if (existingLog) {
                    updatedLogs = logs.map((log) =>
                        log.date === today ? { ...log, value: log.value + 1 } : log
                    );
                } else {
                    updatedLogs = [...logs, { date: today, value: 1 }];
                }

                const newProgress = Math.min(goal.progress + 1, goal.target);
                const justCompleted =
                    newProgress >= goal.target && goal.status !== "Completed";

                const updated = {
                    ...goal,
                    progress: newProgress,
                    status: newProgress >= goal.target ? "Completed" : "Active",
                    logs: updatedLogs,
                    completedAt: justCompleted ? new Date().toISOString() : goal.completedAt,
                };

                if (justCompleted) completedGoal = updated;
                return updated;
            })
        );

        if (completedGoal) {
            setCelebrateGoal(completedGoal);
        }
    };

    const clearCelebration = () => setCelebrateGoal(null);

    //Toggle Pause
    const togglePause = (id) => {
        setGoals((prev) =>
            prev.map((goal) =>
                goal.id === id
                    ? {
                        ...goal,
                        status: goal.status === "Paused" ? "Active" : "Paused",
                    }
                    : goal
            )
        );
    };

    //  Delete Goal
    const deleteGoal = (id) => {
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
    };

    // ---- Notes / Journaling ----
    const addNote = (goalId, text) => {
        const trimmed = (text || "").trim();
        if (!trimmed) return;
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id !== goalId) return goal;
                const note = {
                    id: makeId("note"),
                    text: trimmed,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                return { ...goal, notes: [note, ...(goal.notes || [])] };
            })
        );
    };

    const updateNote = (goalId, noteId, text) => {
        const trimmed = (text || "").trim();
        if (!trimmed) return;
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id !== goalId) return goal;
                return {
                    ...goal,
                    notes: (goal.notes || []).map((n) =>
                        n.id === noteId
                            ? { ...n, text: trimmed, updatedAt: new Date().toISOString() }
                            : n
                    ),
                };
            })
        );
    };

    const deleteNote = (goalId, noteId) => {
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id !== goalId) return goal;
                return {
                    ...goal,
                    notes: (goal.notes || []).filter((n) => n.id !== noteId),
                };
            })
        );
    };

    // STREAK STATS (current, longest, weekly %, monthly %)
    const streakStats = useMemo(() => getStreakStats(goals), [goals]);
    const streak = streakStats.currentStreak; // kept for backward compatibility

    //  Total Completed
    const totalCompleted = useMemo(() => {
        return goals.filter((g) => g.status === "Completed").length;
    }, [goals]);

    //  Overall Progress
    const overallProgress = useMemo(() => {
        if (goals.length === 0) return 0;

        return Math.round(
            (goals.reduce(
                (sum, g) => sum + (g.progress || 0) / (g.target || 1),
                0
            ) /
                goals.length) *
                100
        );
    }, [goals]);

    const totalXP = useMemo(
        () => calculateXP(goals, streakStats.currentStreak),
        [goals, streakStats.currentStreak]
    );

    return (
        <GoalsContext.Provider
            value={{
                goals,
                addGoal,
                increaseProgress,
                togglePause,
                deleteGoal,
                loading,
                streak,
                streakStats,
                totalCompleted,
                overallProgress,
                totalXP,
                startEditGoal,
                updateGoal,
                editGoal,
                setGoals,
                clearEditGoal,
                addNote,
                updateNote,
                deleteNote,
                celebrateGoal,
                clearCelebration,
            }}
        >
            {children}
        </GoalsContext.Provider>
    );
}

export function useGoals() {
    const context = useContext(GoalsContext);
    if (!context) {
        throw new Error("useGoals must be used inside GoalsProvider");
    }
    return context;
}
