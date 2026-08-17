export const goalTypeOption = {
  daily: "Daily",
  countBased: "Count Based",
  timeBased: "Time Based",
};

// Default, built-in categories. Users can add their own on top of these
// from the Categories page or the Create Goal form (see CategoryContext).
export const defaultCategories = [
  { id: "health", name: "Health", color: "#2e7d32", isDefault: true },
  { id: "study", name: "Study", color: "#1954d2", isDefault: true },
  { id: "work", name: "Work", color: "#ef6c00", isDefault: true },
  { id: "personal", name: "Personal", color: "#8e24aa", isDefault: true },
];

// Kept for any older code paths that expect a plain id -> label map.
export const categoryOption = defaultCategories.reduce((acc, c) => {
  acc[c.id] = c.name;
  return acc;
}, {});

export const filterMap = {
  All: "all",
  Active: "active",
  Paused: "paused",
  Completed: "completed",
};
