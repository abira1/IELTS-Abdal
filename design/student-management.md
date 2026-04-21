# Student Management: Directory & Entry

A high-utility section designed for managing thousands of student records with spreadsheet-like efficiency but modern design polish.

## 1. Directory Table
- **Search Header**:
  - Search Input: Large `rounded-2xl` bar with a subtle border and inner icon.
  - Action Buttons: `rounded-2xl` buttons for "Filter" and "Export" using `bg-white` and `text-slate-700`.
- **Table Structure**:
  - Header Row: `uppercase text-xs tracking-wider text-slate-500`.
  - Content Rows: Hoverable with a subtle gray tint.
  - Column 1 (Student): Pair of avatar and name/email stack.
  - Column 2 (Course/Batch): Bold `text-sm` course name above a light batch ID.
  - Column 3 (Status): Status pills (`rounded-full py-1 px-3 text-[10px]`) with mapping (Active: Emerald, Inactive: Slate, Completed: Blue).

## 2. Add/Edit Student Modal
- **Overlay**: `bg-slate-900/40` with `backdrop-blur-sm`.
- **Panel**: Centered white panel, `rounded-[32px]`, max-width `2xl`.
- **Form Layout**: 2-column grid for desktop (`grid-cols-2`), stacking on mobile.
- **Controls**:
  - Labels: Small, bold `text-sm` text placed `ml-1` above the input.
  - Inputs: Large `min-h-[52px]` field with `rounded-2xl`, `bg-slate-50`, and soft border.
  - Actions: A dual-button row at the bottom. The "Save/Submit" button is always `full-width` on mobile.
