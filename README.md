# 📌 Goal Tracker Project

A simple and powerful goal tracking application that helps users create, manage, and track personal goals with progress, streaks, analytics, and XP-based motivation.

---

## 🛠️ How to Run

1. Navigate to the project folder

cd goaltracker

2. Install dependencies

npm install

3. Run the development server

npm run dev

Then open the localhost URL displayed in your terminal in your browser.

---

## 🚀 Features

🎯 Goal Management

Complete CRUD functionality for managing personal goals:

- Create Goal — Create a goal with details, category, type, start date, target, and optional deadline
- Read/List Goals — Browse and view all goals
- Update Goal — Edit existing goals
- Delete Goal — Delete goals with a confirmation dialog
- Pause Goals — Temporarily pause goal progress
- Archive Goals — Keep completed or inactive goals organized separately
- Search, Filter & Sort — Easily find goals based on different criteria

---

## 📈 Progress Tracking

Each goal supports detailed progress tracking:

- Add progress entries
- Track progress over time
- Automatically calculate progress percentage
- Display progress visually
- Automatically mark a goal as completed when it reaches 100%
- Track progress history through individual logs
- View progress on the calendar based on the actual date it was recorded

---

## 🔥 Streak System

The streak system tracks daily goal activity and consistency.

Streak Rules

- A streak increases when the user logs progress on consecutive calendar days
- Missing a day resets the current streak
- Streaks are based on calendar days, not hours
- Track the current streak
- Track the longest streak ever recorded
- Calculate weekly completion percentage
- Calculate monthly completion percentage

---

## ⭐ XP & Leveling System

The application includes an XP-based motivation and leveling system.

Users can earn XP through:

- Progress logs — Each progress log awards XP
- Streak activity — Consistent activity contributes to the user's XP
- Goal completion — Completing a goal awards additional XP

The leveling system includes:

- Current XP
- Current level
- Level title
- Progress toward the next level
- Visual level progress card

When a goal reaches 100%, a 🎉 GOAL COMPLETED! celebration modal appears with:

- Goal name
- Completion date
- XP reward

---

## 🏷️ Custom Categories

Users can organize their goals using categories.

- Built-in default categories
- Create custom categories
- Set a custom category name
- Choose a category color
- Create categories from the Categories page
- Create categories directly from the Create Goal form
- Manage categories independently

---

## 📅 Calendar View

The calendar provides a visual overview of goal activity.

It displays:

- Goal start dates
- Goal deadlines
- Progress logs
- Goal activity on its actual calendar date
- Monthly goal activity

This makes it easier to understand goal consistency and progress over time.

---

## 📊 Analytics Dashboard

The application includes a Recharts-powered analytics dashboard.

Analytics include:

- Activity Trend Chart — Visualize goal activity over time
- Goals by Status — Pie chart showing goal status distribution
- Progress by Category — Bar chart showing progress across categories
- Goals by Type — Pie chart showing the distribution of goal types
- Weekly completion percentage
- Monthly completion percentage
- Current streak
- Longest streak

---

## ⏰ Deadline Tracking

Goals can have an optional deadline.

Deadline status is calculated dynamically based on the current date.

Deadline Status

- 🟢 Healthy
- 🟡 Approaching
- 🔴 Urgent
- ⚠️ Overdue

Deadline status is calculated live rather than being stored as a hard-coded value.

---

## 📝 Notes & Journaling

Each goal includes a notes/journaling system.

Users can:

- Create notes
- Edit notes
- Delete notes
- Keep additional information or reflections related to a goal

This allows users to record thoughts, challenges, achievements, and other details while working toward their goals.

---

## 💾 Data Persistence

Goal data is persisted using LocalStorage, allowing information to remain available after refreshing or reopening the browser.

Persistent data includes:

- Goals
- Progress logs
- Categories
- Notes
- Goal activity
- Other application state

---

## 📤 Export Goals

Users can export individual goals as a JSON file.

The exported goal includes:

- Goal information
- Progress logs
- Notes
- Related goal data

This allows users to keep a portable copy of their goal information.

---

## 🌐 Language Support — RTL / LTR

The application supports both Left-to-Right (LTR) and Right-to-Left (RTL) layouts.

LTR — English

- Default layout direction
- Used for the English interface
- Standard left-to-right alignment

RTL — Persian / Dari / Arabic

- Activated when the language is set to Persian
- Layout switches to "direction: rtl"
- Text alignment changes to the right
- Icons and spacing automatically adapt to the reading direction

This provides a more natural experience for both LTR and RTL language users without breaking the UI structure.

---

## 📱 Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

Responsive improvements include:

- Mobile navigation drawer with hamburger menu
- Responsive goal card actions
- Responsive search, filter, and sort controls
- Mobile-friendly dashboard
- Responsive analytics cards and charts
- Flexible layouts that adapt to different screen sizes

---

## 🎨 UI/UX

- Modern and clean interface
- Consistent color palette
- Gradient app bar
- Rounded corners
- Consistent shadows
- Responsive cards
- Confirmation dialogs for destructive actions
- Goal completion celebration modal
- Progress indicators
- Deadline status chips
- Empty states
- Responsive navigation
- Mobile-friendly interactions

---

## 🛠️ Technologies Used

Category| Technology
Frontend| React
Language| JavaScript / JSX
Styling| CSS
Charts| Recharts
State Management| React Context API
Data Persistence| LocalStorage
Internationalization| English & Farsi
Layout Direction| LTR / RTL
Data Export| JSON

---

## 📂 Project Structure
```
goaltracker/
│
├── src/
│   ├── components/
│   │   ├── Categories/
│   │   │   └── CreateCategoryModal.jsx
│   │   ├── Dashboard/
│   │   │   └── LevelCard.jsx
│   │   ├── goals/
│   │   │   └── NotesSection.jsx
│   │   ├── DeadlineChip.jsx
│   │   └── GoalCompletionModal.jsx
│   │
│   ├── context/
│   │   └── CategoryContext.jsx
│   │
│   ├── pages/
│   │   ├── Calendar.jsx
│   │   └── Analytics.jsx
│   │
│   └── utils/
│       ├── storage.js
│       ├── id.js
│       ├── deadline.js
│       ├── streaks.js
│       ├── points.js
│       ├── analytics.js
│       ├── exportGoal.js
│       └── calendarUtils.js
│
├── package.json
└── README.md
```
---

👩‍💻 Developer

Faezah Ahmadi
