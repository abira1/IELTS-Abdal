# IELTS Abdal - Codebase Index

## Project Overview
A comprehensive IELTS examination and management system built with React, TypeScript, and Firebase. The platform supports multiple user roles (Admin, Student, Teacher) with role-based dashboards and exam management features.

---

## 📁 Directory Structure

### Root Files
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler configuration
- `tailwind.config.js` - Tailwind CSS customization
- `firebase.json` - Firebase deployment config
- `database.rules.json` - Firebase Realtime Database security rules
- `postcss.config.js` - PostCSS configuration

### `/public`
Static assets served directly by the application.

### `/design`
Design documentation and specifications:
- `global-theme.md` - Color palette, typography, spacing system
- `ui-architecture.md` - UI component hierarchy and patterns
- `admin-dashboard.md` - Admin panel design specs
- `student-dashboard.md` - Student panel design specs
- `student-management.md` - Student management features
- `exam-center.md` - Exam center management
- `financials.md` - Financial tracking and reporting
- `logistics.md` - Logistics management specs

### `/Questions`
Test question files organized by exam ID (701-712) and section type:
- Listening, Reading, and Writing sections
- Formats: `.txt` files containing question content

### `/src` - Main Application Source

#### `/src/components` - React Components
**Layout Components** (`layout/`):
- `AppLayout.tsx` - Main layout wrapper with sidebar and header
- `Sidebar.tsx` - Navigation sidebar for all user roles (Admin, Student, Teacher)
- `Header.tsx` - Top header with search, notifications, and profile

**Admin Components** (`admin/`):
- `AddStudentModal.tsx` - Add new student form
- `EditStudentModal.tsx` - Edit student information
- `ExpenseManager.tsx` - Expense tracking and management

**Question Components** (`questions/`):
- `DragAndDropQuestion.tsx` - Drag-drop answer type
- `DragDropSummaryQuestion.tsx` - Summary task with drag-drop
- `DragDropTableQuestion.tsx` - Table completion with drag-drop
- `DropdownQuestion.tsx` - Multiple choice dropdown
- `MultipleChoiceQuestion.tsx` - Single select MCQ
- `MultipleChoiceMultiSelectQuestion.tsx` - Multiple select MCQ
- `ParagraphGapQuestion.tsx` - Paragraph gap filling
- `SentenceCompletionQuestion.tsx` - Sentence completion
- `TableGapQuestion.tsx` - Table with gap completion
- `MapLabelingQuestion.tsx` - Map/diagram labeling
- `MapTextInputQuestion.tsx` - Map/diagram text input
- `FlowChartQuestion.tsx` - Flowchart completion

**UI Components** (`ui/`):
- Modal components, input fields, buttons, etc.

**Core Components**:
- `ExamController.tsx` - Main exam session controller
- `ExamHeader.tsx` - Exam header with timer and audio
- `ExamInstructions.tsx` - Exam instruction display
- `QuestionNavigator.tsx` - Question navigation panel
- `AnswerKeyUploadModal.tsx` - Answer key upload interface
- `AudioManager.tsx` - Audio playback management
- `ExamAudioPlayer.tsx` - Audio player component
- `AdminLogin.tsx` - Admin authentication
- `StudentLogin.tsx` - Student authentication
- `StaffLogin.tsx` - Staff/Teacher authentication
- `ProtectedRoute.tsx` - Route protection wrapper
- `PrintableResult.tsx` - Printable exam results
- `WritingMarkingModal.tsx` - Writing section marking
- `SpeakingMarksInput.tsx` - Speaking marks entry
- `RoleManagement.tsx` - User role management
- `TrackForm.tsx` - Track/batch management form

#### `/src/pages` - Page Components
Complete page views for different routes:
- `NewHomePage.tsx` - Landing page with portal selection
- Admin, Student, and Teacher dashboard pages
- Exam pages, results pages, etc.

#### `/src/contexts` - React Context (State Management)
- `AuthContext.tsx` - Authentication and user state
- Other context providers for global state

#### `/src/services` - API/Service Layer
- Firebase authentication services
- Exam management services
- Student management services
- Data synchronization services

#### `/src/utils` - Utility Functions
Helper functions for:
- Date/time formatting
- Data validation
- String manipulation
- Common calculations

#### `/src/lib` - Third-party Library Integrations
- Firebase configuration
- External library wrappers

#### `/src/data` - Static Data and Constants
- Predefined question sets
- Configuration constants
- Lookup tables

---

## 🎯 Key Features by User Role

### Admin Panel
- Dashboard overview
- Student management (add, edit, delete)
- Batch/track management
- Exam control and monitoring
- Submissions review
- Role management
- Expense tracking
- Answer key management

### Student Panel
- Personal dashboard
- Exam list and registration
- Take exams (interactive)
- View results and scores
- Performance analytics
- Submit answers
- Track progress

### Teacher/Staff Panel
- View submissions
- Grade writing and speaking
- Monitor student progress

---

## 🔐 Authentication & Authorization

**Flow**:
1. User selects role (Admin/Student/Staff) on homepage
2. Login credentials validated via Firebase Auth
3. User role verified and stored in context
4. Protected routes enforce role-based access
5. Sidebar/navigation adapts based on user role

**Files**:
- `AuthContext.tsx` - Authentication context
- `ProtectedRoute.tsx` - Route protection
- `AdminLogin.tsx`, `StudentLogin.tsx`, `StaffLogin.tsx` - Login pages

---

## 🎨 Styling & Theme

**System**:
- Tailwind CSS for utility-first styling
- Custom color palette defined in `tailwind.config.js`
- Consistent spacing and typography system
- Responsive design (mobile-first approach)

**Color Tokens** (from design docs):
- `midnight-*` - Dark navy primary colors
- `forest-*` - Green accent colors
- `slate-*` - Gray neutral colors
- `porcelain` - Off-white backgrounds

---

## 📊 Exam System Architecture

### Question Types Supported
- Multiple Choice (single & multiple select)
- Drag & Drop (various formats)
- Gap Filling (paragraph, sentence, table)
- Map/Diagram Labeling
- Text Input
- Flowchart Completion
- Writing Tasks
- Speaking Assessment

### Exam Flow
1. **Instructions** - Display test guidelines
2. **Questions** - Sequential question display with navigation
3. **Submission** - Collect and validate answers
4. **Marking** - Teacher marks writing/speaking sections
5. **Results** - Display comprehensive results and analytics

---

## 🚀 Running & Building

### Available Scripts (from package.json)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

### Firebase Integration
- Real-time database for exams and submissions
- User authentication
- File storage for documents
- Security rules in `database.rules.json`

---

## 📝 Important Patterns & Conventions

### Component Structure
- Functional components with TypeScript
- Props interface defined at component level
- Hooks for state management (useState, useContext)
- Custom hooks for logic reuse

### File Naming
- Components: PascalCase (e.g., `ExamController.tsx`)
- Utilities/services: camelCase (e.g., `authService.ts`)
- Constants in UPPERCASE

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl` (Tailwind)
- Sidebar collapses on mobile (toggle via hamburger)

---

## 🔍 Navigation Map

```
/ (NewHomePage)
├── /admin/login → /admin/dashboard
│   ├── /admin/students
│   ├── /admin/batches
│   ├── /admin/submissions
│   └── [Tab-based: tracks, exam-control, role-management, expenses]
├── /student/login → /student/dashboard
│   ├── /student/exam/:id
│   └── /student/results
└── /teacher/login → /teacher/dashboard
    └── /teacher/submissions
```

---

## 🛠️ Development Tips

### Adding a New Question Type
1. Create component in `/src/components/questions/`
2. Follow existing question component pattern
3. Add to question type enum/registry
4. Update exam controller to handle new type

### Adding a New Page
1. Create in `/src/pages/`
2. Wrap with `AppLayout` component (if authenticated)
3. Add route in main router configuration
4. Update navigation links in `Sidebar.tsx`

### Updating Theme
1. Modify colors in `tailwind.config.js`
2. Or override in component-specific CSS
3. Test across all pages for consistency

---

## 📦 Dependencies

**Core**:
- React 18+
- TypeScript
- Vite (build tool)
- React Router (routing)

**UI/Styling**:
- Tailwind CSS
- Lucide React (icons)

**Backend**:
- Firebase (auth, database, storage)

**Utilities**:
- Various npm packages (see package.json)

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Sidebar logo not visible | Check white background container classes (updated with white bg) |
| Authentication fails | Verify Firebase config in `firebase.ts` |
| Exam not loading | Check question data format matches component expectations |
| Styling inconsistent | Verify Tailwind classes and color tokens |
| Build fails | Run `npm install` and check TypeScript errors |

---

## 📞 Key Contacts & References

**Firebase Documentation**: https://firebase.google.com/docs
**Tailwind CSS**: https://tailwindcss.com
**React Documentation**: https://react.dev
**TypeScript**: https://www.typescriptlang.org

---

**Last Updated**: April 27, 2026
**Version**: 1.0
