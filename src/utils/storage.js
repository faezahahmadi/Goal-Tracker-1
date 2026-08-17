// Simple localStorage persistence helpers (no backend, so we keep everything client side)
const PREFIX = "goalTracker:";

export function loadFromStorage(key, fallback) {
    try {
        const raw = window.localStorage.getItem(PREFIX + key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch (err) {
        console.warn(`Failed to load "${key}" from storage`, err);
        return fallback;
    }
}

export function saveToStorage(key, value) {
    try {
        window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (err) {
        console.warn(`Failed to save "${key}" to storage`, err);
    }
}

export function removeFromStorage(key) {
    try {
        window.localStorage.removeItem(PREFIX + key);
    } catch (err) {
        console.warn(`Failed to remove "${key}" from storage`, err);
    }
}
