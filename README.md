📌 Goal Tracker Project
A simple and powerful goal tracking application that helps users create, manage, and track personal goals with progress,
 streaks, and XP-based motivation.

🛠️   How to run:
  
1. Navigate to the Folder 
cd goaltracker
2. Install dependencies
npm install (i)
3. Run the Project
npm run dev 
and open the localhost on your browser


🚀 Features Checklist
Goal Management (CRUD)
• Create goal
• Read/list goals
• Update/edit goal
• Delete goal (confirm dialog)

Progress Tracking
Each goal supports progress updates:
• Add progress entry
• Auto-calculate progress %
• When reaching target → mark as completed

Streak System
• Streak increases if user logs progress on consecutive days 
• Reset if they miss a day

XP 
• Each progress log gives 10 XP
• Completing a goal gives 40 XP

🌐 Language Support (RTL / LTR)
This project supports both Left-to-Right (LTR) and Right-to-Left (RTL) layouts.

LTR (English)
Default layout direction
Used for English interface
Standard UI alignment (left-based layout)

RTL (Persian / Dari / Arabic)
• Activated when language is set to Persian
• Layout switches using direction: rtl
• Text alignment changes to right

Icons and spacing automatically adapt for natural reading flow
This ensures a native experience for both language groups without breaking UI structure.

🔥 Streak System
The streak system tracks daily goal activity consistency.
Rules:
A streak increases when at least one goal is completed per day
Missing a day resets the streak to 0 
Streak is tied to calendar days, not hours

Developer 
Faezah Ahmadi



