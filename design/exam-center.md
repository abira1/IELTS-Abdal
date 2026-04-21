# Exam Center: Testing Environment

The interface for managing and participating in academic evaluations.

## 1. Exam Lobby (The "Launchpad")
- **Layout**: Dynamic Masonry or Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Exam Cards**:
  - Each card is an elevated white container.
  - Features a module-specific icon block (e.g., Book for Reading, Micro-icon for Listening).
  - Time Metadata: `text-[10px]` bold uppercase pills showing duration.
- **Join Action**: Prominent full-width button at the bottom of the card with `rounded-2xl` and emerald branding.

## 2. Mock Exam Interface (Active Test)
- **Header**: Persistent top bar showing Time Remaining (flashing red if < 5 mins) and the student's name.
- **Main Layout**: Split-screen design for reading (Text on Left, Questions on Right).
- **Navigation (The Question Map)**:
  - A grid of numbered circles at the bottom or side.
  - State mapping:
    - Attempted: Green background.
    - Tagged for Review: Orange border.
    - Unattempted: Light gray.
- **Control Bar**: Large navigation buttons ("Previous", "Next") and a high-contrast "Submit Exam" button with a confirmation safeguard.
