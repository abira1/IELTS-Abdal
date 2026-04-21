# Student Dashboard: Personal Growth & Analytics

This section focuses on data visualization and personal goal tracking for the individual learner.

## 1. Performance Tracking (Analytics Engine)
- **Container**: White elevated card, `rounded-[32px]`, `p-8`.
- **Top Bar**: Module Selection tabs (`text-sm font-bold`) using an indicator-less background toggle (active tab is `bg-slate-100` or `text-emerald-700`).
- **Main Chart (Custom D3/Framer Bars)**:
  - **Grid**: Subtle horizontal background lines every 2 band scores.
  - **Bars**: `w-12 md:w-16` bars with `rounded-t-2xl`. 
  - **Colors**: Use a gradient-like scale or unified `emerald-500`.
  - **Interaction**: Animated vertical growth on tab switch. On-hover tooltips reveal the precise Band Score.
- **Side Metrics**: A vertical stack showing "Average Band" and "Tests Taken" in oversized `text-4xl` numbers to provide instant validation.

## 2. Mock Exam Shortcut Card
- **Style**: High-contrast "Call to Action" card.
- **Design Elements**:
  - Uses a decorative background element (`absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px]`) to create depth.
  - Features a progress bar (`w-full h-3 bg-slate-100 rounded-full`) with an animated fill representing current course completion.

## 3. Feed & Notices
- **Layout**: Vertical stack of notifications.
- **Design**: Each notice is a soft slate box with elevated focus on the "New" badge (Red dot or Pill).
