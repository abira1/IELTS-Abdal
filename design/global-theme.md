# Forest & Slate: Global Design Language

This document defines the overarching aesthetic framework for the Abdal Academy platform. It is designed to evoke a sense of professional growth, architectural stability, and focused learning.

## 1. Prime Color Palette
- **Deep Emerald (#0F3D2E)**: Used for primary actions, sidebar active states, and focus elements. It represents growth and authority.
- **Midnight Slate (#1F2A44)**: The primary navigation and text color. It provides a formal, trustworthy foundation.
- **Porcelain (#F5F3EF)**: The main background color for the application. It creates a soft, paper-like feel that reduces eye strain compared to pure white.
- **Pure White (#FFFFFF)**: Reserved for card backgrounds and elevated containers to create high contrast against the Porcelain floor.

## 2. Typography
- **Primary Interface (Sans-Serif)**: Inter.
- **Headings**: Semi-bold to Bold (weights 600-700).
- **Body**: Regular (weight 400).
- **Scale**:
  - `text-3xl`: Page Titles.
  - `text-2xl`: Major Section Headers.
  - `text-xl`: Card Titles.
  - `text-sm`: General UI labels.
  - `text-xs`: Metadata and Helper text.

## 3. Shape & Geometry
- **Border Radius**: 
  - `rounded-[32px]`: Large containers and dashboard cards. This heavy curvature is a signature of the "Zen" aesthetic.
  - `rounded-2xl` (16px): Buttons, inputs, and list items.
  - `rounded-xl` (12px): Small UI elements like thumbnails or badges.
- **Borders**: Subtle `border-slate-100` or `border-slate-200` are used to define boundaries without adding visual clutter.

## 4. Interaction & Motion (with motion/react)
- **Scale-Up**: Hovering over cards triggers a subtle `scale: 1.02` transition.
- **Staggered Entry**: Page sections should use `initial={{ opacity: 0, y: 10 }}` and `animate={{ opacity: 1, y: 0 }}` with staggered delays to feel like a premium application.
- **Fluid Springs**: Progress bars and chart data should use `type: "spring", stiffness: 100` for organic responsiveness.
