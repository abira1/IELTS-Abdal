# UI Architecture: Navigation & Structural Layers

This document defines the persistent structural elements that frame the user experience.

## 1. Sidebar Navigation (The Column)
- **Background**: Midnight Slate (#1F2A44).
- **Branding**: The logo is placed in the top-left with a `mb-10` padding.
- **Link Styling**:
  - Unselected: `text-slate-400`.
  - Selected: `bg-[#0F3D2E] text-white` (Deep Forest green).
  - Hover: `bg-white/5`.
- **Shape**: `rounded-xl` items with a `px-4 py-3` inner padding.
- **Micro-interaction**: Small `ChevronRight` appears on selected links in desktop view.

## 2. Global Header
- **Layout**: High-contrast white bar, `h-16`.
- **Search Bar (Desktop)**: A pill-shaped input (`rounded-full`) that expands slightly on focus.
- **Notification Bell**: Features a soft `red-500` ping dot.
- **User Profile**: A horizontal stack featuring a `rounded-full` avatar and a small typography stack (Name / Role).

## 3. Layout Transitions
- **Motion**: Every page switch should use an `AnimatePresence` wrapper.
- **Pattern**: `initial={{ opacity: 0, x: -10 }}` -> `animate={{ opacity: 1, x: 0 }}` -> `exit={{ opacity: 0, x: 10 }}`. This creates a logical "Forward/Backward" movement feel.

## 4. Mobile Responsiveness
- **Behavior**: The sidebar collapses into a drawer (`-translate-x-full`).
- **Trigger**: A "Hamburger" menu icon in the top-left of the header.
- **Canvas Scaling**: Dashboard cards stack vertically (`col-span-1`).
