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
## screenshots
<img width="1024" height="457" alt="8" src="https://github.com/user-attachments/assets/7433aca8-1880-4958-bbda-d9dc499de809" />
<img width="644" height="722" alt="10" src="https://github.com/user-attachments/assets/f4f626e8-882d-423d-b40b-0696aeabf5fa" />
<img width="1365" height="641" alt="7" src="https://github.com/user-attachments/assets/c9808f56-bb1d-4c9b-8221-63c2306bdccd" />
<img width="1363" height="621" alt="6" src="https://github.com/user-attachments/assets/391513c9-d604-4f07-86e6-5b0136055238" />
<img width="1355" height="636" alt="5" src="https://github.com/user-attachments/assets/dee350a8-09b0-4993-a309-532b01498eb4" />
<img width="692" height="626" alt="4" src="https://github.com/user-attachments/assets/7e98ba6a-7c4d-4873-a701-07de9ddccc2f" />
<img width="1361" height="639" alt="3" src="https://github.com/user-attachments/assets/7bb2d7e7-1747-4e89-8e21-7612db74414d" />
<img width="1363" height="619" alt="2" src="https://github.com/user-attachments/assets/287513c6-a3ab-42c8-98a4-5a25267d0921" />
<img width="1366" height="648" alt="1" src="https://github.com/user-attachments/assets/961f15f3-ca3b-45bb-8627-e52381c92c72" />
<img width="1366" height="643" alt="14" src="https://github.com/user-attachments/assets/65ddfb4e-0870-446d-ba88-14d0e161a591" />
<img width="1366" height="639" alt="13" src="https://github.com/user-attachments/assets/6bc85dc6-30b9-41d9-a75b-cd2e2979168e" />
<img width="1366" height="645" alt="12" src="https://github.com/user-attachments/assets/297ad167-2dbd-4341-8fbb-56c7082f5840" />
<img width="385" height="461" alt="11" src="https://github.com/user-attachments/assets/67882eaf-ab2f-4fb9-8b03-3b2024a08dbd" />
👩‍💻 Developer
Faezah Ahmadi
