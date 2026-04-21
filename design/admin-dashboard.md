# Admin Dashboard: Design Specification

The Admin Dashboard is the high-density nerve center of the academy. It prioritizes quick-scan metrics and immediate calls to action.

## 1. Metrics Row (KPIs)
- **Layout**: A responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) with `gap-6`.
- **Component**: 
  - Background: White card with `rounded-[32px]`.
  - Content: 
    - Left: Icon container (`w-12 h-12 rounded-2xl`) with module-specific accent colors (Blue for Students, Emerald for Batches, Orange for Exams, Purple for Fees).
    - Right: Label (`text-sm text-slate-500 font-medium`) and Value (`text-2xl font-bold text-slate-900`).

## 2. Recent Admissions Section
- **Visual Style**: White container, `rounded-[32px]`, `p-8`.
- **List Item Design**:
  - Horizontal Flexbox with `justify-between`.
  - Left: "Student Block" featuring a `rounded-full` avatar placeholder with the student's initial and a `text-xs` metadata line showing course and ID.
  - Right: "Financial Badge" showing amount and a status pill (`text-[10px] font-bold uppercase` e.g., "PAID" in emerald-600).

## 3. Activities Grid (2:1 Layout)
- **Primary Column**: Houses "Recent Admissions" and "Latest Notices".
- **Secondary Column**: Houses "Upcoming Exams".
- **Upcoming Exams Card**: 
  - Features individual rows with a date icon (`w-12 h-12 bg-slate-50 rounded-2xl`).
  - Text stack: Exam Title (`font-bold`), Module Details (`text-xs`), and an accent date label in `emerald-600`.

## 4. Notice Feed
- **Layout**: A `grid-cols-1 md:grid-cols-2` layout within the parent container.
- **Card**: Compact `p-4` boxes with `rounded-2xl`, `bg-slate-50`, and a `line-clamp-2` setting for content to maintain a uniform vertical rhythm.
