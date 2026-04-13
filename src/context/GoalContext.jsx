import intialGoals from "../Data/Data";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const GoalsContext = createContext();

export function GoalsProvider({ children }) {
    const [goals, setGoals] = useState([]);
    const [editGoal, setEditGoal] = useState(null);

    useEffect(() => {
        if (goals.length === 0) {
            const seededGoals = intialGoals.map(g => ({
                ...g,
                startDate: new Date(g.startDate),
                createdAt: new Date(g.createdAt),
                id: String(g.id)
            }));
            setGoals(seededGoals);
        }
    }, [])
    const startEditGoal = (goal) => {
        setEditGoal(goal);
    };
    const clearEditGoal = () => {
        setEditGoal(null);
    };
    const updateGoal = (updatedGoal) => {
        setGoals(prev =>
            prev.map(goal =>
                goal.id === updatedGoal.id ?
                    updatedGoal : goal
            ))
    };

    //  Add Goal
    const addGoal = (goalData) => {
        const newGoal = {
            id: Date.now() + Math.random(),
            ...goalData,
            progress: 0,
            target: Number(goalData.target) || 1,
            status: "Active",
            logs: [],
            createdAt: new Date(),
            xp: 0
        };

        setGoals(prev => [...prev, newGoal]);
    };
    //  Increase Progress
    const increaseProgress = (id) => {
        const today = new Date().toISOString().split("T")[0];

        setGoals(prev =>
            prev.map(goal => {
                if (goal.id !== id) return goal;

                const logs = goal.logs || [];

                const existingLog = logs.find(log => log.date === today);

                let updatedLogs;
                if (existingLog) {
                    updatedLogs = logs.map(log =>
                        log.date === today ? { ...log, value: log.value + 1 } : log
                    );
                } else {
                    updatedLogs = [...logs, { date: today, value: 1 }];
                }

                const newProgress = Math.min(goal.progress + 1, goal.target);

                return {
                    ...goal,
                    progress: newProgress,
                    status: newProgress >= goal.target ? "Completed" : "Active",
                    logs: updatedLogs
                };
            })
        );
    };

    //Toggle Pause
    const togglePause = (id) => {
        setGoals(prev =>
            prev.map(goal =>
                goal.id === id
                    ? {
                        ...goal,
                        status:
                            goal.status === "Paused" ? "Active" : "Paused"
                    }
                    : goal
            )
        );
    };

    //  Delete Goal
    const deleteGoal = (id) => {
        setGoals(prev => prev.filter(goal => goal.id !== id));
    };

    // STREAK 
    const streak = useMemo(() => {
        if (!goals || goals.length === 0) return 0;

        let allDates = [];

        goals.forEach(goal => {
            (goal.logs || []).forEach(log => {
                allDates.push(log.date);
            });
        });

        if (allDates.length === 0) return 0;

        const uniqueDates = [...new Set(allDates)];
        uniqueDates.sort((a, b) => new Date(b) - new Date(a));

        let streakCount = 0;
        let currentDate = new Date();

        for (let i = 0; i < uniqueDates.length; i++) {
            const logDate = new Date(uniqueDates[i]);

            const diff = Math.floor(
                (currentDate - logDate) / (1000 * 60 * 60 * 24)
            );

            if (diff === 0 || diff === 1) {
                streakCount++;
                currentDate = logDate;
            } else {
                break;
            }
        }

        return streakCount;
    }, [goals]);

    //  Total Completed
    const totalCompleted = useMemo(() => {
        return goals.filter(g => g.status === "Completed").length;
    }, [goals]);

    //  Overall Progress
    const overallProgress = useMemo(() => {
        if (goals.length === 0) return 0;

        return Math.round(
            goals.reduce(
                (sum, g) => sum + ((g.progress || 0) / (g.target || 1)),
                0
            ) / goals.length * 100
        );
    }, [goals]);

    return (
        <GoalsContext.Provider
            value={{
                goals,
                addGoal,
                increaseProgress,
                togglePause,
                deleteGoal,
                streak,
                totalCompleted,
                overallProgress,
                startEditGoal,
                updateGoal,
                editGoal,
                setGoals,
                clearEditGoal
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
