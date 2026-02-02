# Task Manager Dashboard

A simple, responsive task management application built as part of a 3-hour front-end coding assessment.

## Setup

```bash
npm install
npm run dev
```

## Features Implemented

- Create tasks with title and priority (High / Medium / Low)
- List tasks with clear visual priority indicators
- Mark tasks as complete / incomplete
- Inline edit task title and priority
- Delete tasks
- Task statistics (total / completed)
- Search by task title
- Status filters (All / Active / Completed)
- Persist tasks in `localStorage`
- Responsive layout (mobile and desktop)
- Basic unit and integration tests using Vitest + Testing Library

## Technical Notes

- Built with **React + TypeScript + Vite**
- State managed with React hooks (`useState`, `useEffect`)
- Styling with Tailwind CSS
- Accessibility-friendly markup (labels, aria attributes)

## Known Limitations / Improvements

With more time, the following could be added:
- Sorting tasks by priority or creation date
- Additional accessibility polish
- More comprehensive test coverage
- Keyboard shortcuts for power users