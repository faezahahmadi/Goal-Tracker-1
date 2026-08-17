import { createContext, useContext, useEffect, useState } from "react";
import { defaultCategories } from "../Data/GoalOption";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { makeId, slugify } from "../utils/id";

const CategoryContext = createContext();

const STORAGE_KEY = "categories";

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState(() => {
        const stored = loadFromStorage(STORAGE_KEY, null);
        return stored && Array.isArray(stored) && stored.length > 0
            ? stored
            : defaultCategories;
    });

    useEffect(() => {
        saveToStorage(STORAGE_KEY, categories);
    }, [categories]);

    const addCategory = (name, color = "#607d8b") => {
        const trimmed = (name || "").trim();
        if (!trimmed) return null;

        const existing = categories.find(
            (c) => c.name.toLowerCase() === trimmed.toLowerCase()
        );
        if (existing) return existing;

        const id = `${slugify(trimmed)}-${makeId("cat")}`;
        const newCategory = { id, name: trimmed, color, isDefault: false };
        setCategories((prev) => [...prev, newCategory]);
        return newCategory;
    };

    const deleteCategory = (id) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    const getCategoryName = (id) => {
        const found = categories.find((c) => c.id === id);
        return found ? found.name : id;
    };

    const getCategoryColor = (id) => {
        const found = categories.find((c) => c.id === id);
        return found ? found.color : "#607d8b";
    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                addCategory,
                deleteCategory,
                getCategoryName,
                getCategoryColor,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategories must be used inside CategoryProvider");
    }
    return context;
}
