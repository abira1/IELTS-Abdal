# Abdal Academy: Master Design Specification

Welcome to the comprehensive design documentation for Abdal Academy. These files are curated for engineering agents to accurately recreate or extend the high-fidelity **"Forest & Slate"** interface.

## 📁 Specifications Index

1. **[Global Theme](./global-theme.md)**: The DNA of the app (Colors, Fonts, Spacing).
2. **[UI Architecture](./ui-architecture.md)**: Persistent elements (Sidebar, Header, Layout).
3. **[Admin Dashboard](./admin-dashboard.md)**: Mission Control for management.
4. **[Student Dashboard](./student-dashboard.md)**: Personalized analytics and growth.
5. **[Student Management](./student-management.md)**: Records, Directories, and CRM.
6. **[Exam Center](./exam-center.md)**: Testing lobby and live interface.
7. **[Financials](./financials.md)**: Fees, Receipts, and Ledgers.
8. **[Logistics](./logistics.md)**: Batches, Tracks, and Scheduling.

---

## 🛠 Reconstruction Guide for Agents

When implementing these sections, always prioritize:
- **Architectural Clarity**: Ensure high contrast between the `#F5F3EF` porcelain background and the pure white cards.
- **Heavy Radii**: Never use standard small corners; stick to the signature `32px` for major containers.
- **Micro-animations**: Use `motion/react` (Framer Motion) for all state transitions to maintain the premium "App-like" feel.
- **Type Hierarchy**: Maintain the distinction between the Slate (`#1F2A44`) headings and the muted Slate-500 helper text.
