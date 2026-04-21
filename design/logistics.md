# Batches & Scheduling: Instructional Logistics

Design specifications for organizing student groups, tracks, and academic schedules.

## 1. Batch Directory
- **Card-Base**: Standard `rounded-[32px]` cards.
- **Top Row**: Batch Name (`font-bold text-lg`) paired with a `rounded-full` color-dot indicating current capacity status (Green: Open, Yellow: Filling, Red: Full).
- **Metadata Column**: 
  - Time Slot (`text-sm` with a `Clock` icon).
  - Assigned Teacher (`text-sm` with a `User` icon).
  - Student Count (`text-sm` with a `Users` icon).

## 2. Track & Schedule Interface
- **Visuals**: Uses a "Timeline-lite" approach.
- **Components**: Rows of module blocks (e.g., Reading, Writing) with time stamps.
- **Action Toolbar**: A horizontal bar containing buttons for "Update Schedule" and "Assign Student".

## 3. Notices & Announcements
- **Feed Card**: Slate-themed vertical rows.
- **Notice Header**: Features a soft-colored icon representing the category (Regular, Urgent, Exam).
- **Typography**: The title uses `font-bold text-slate-900`, and the content uses `text-sm text-slate-500` with a line-clamp to prevent overflow.
