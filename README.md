# Personal Portfolio React Application

A modern, responsive, multi-page portfolio application built with React, Vite, and React Router. This project transforms a static HTML/CSS portfolio into a dynamic React Single Page Application (SPA).

## Technologies Used
- React (Functional Components, Hooks)
- Vite (Build Tool)
- React Router DOM (Client-Side Routing)
- Plain CSS (Custom CSS Variables for Theming)

## Setup and Run Instructions

### Prerequisites
- Node.js installed

### Installation
1. Clone this repository or extract the zipped folder.
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project Locally
Start the development server:
```bash
npm run dev
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```

## Application Architecture

### Component Tree
```text
App
 ├── BrowserRouter
      └── Routes
           └── Layout (receives theme state from App)
                ├── Navbar (Theme Toggle button)
                ├── Outlet (Renders one of the pages below)
                │    ├── Home
                │    ├── About
                │    │    ├── ExperienceCard
                │    │    └── SkillCategory
                │    ├── Projects
                │    │    └── ProjectList
                │    │         └── ProjectCard (Independent "View Details" state)
                │    ├── ProjectDetails (Dynamic route using useParams)
                │    ├── Contact
                │    │    └── ContactForm (Controlled component with validation)
                │    └── NotFound (404 Page)
                └── Footer
```

### State Management (useState)
The application leverages React's `useState` for state management without external libraries (like Redux or Zustand).

1. **Theme State (`App.jsx`)**: Lifted to the top level. It manages whether the application is in `dark` or `light` mode. It is passed down to `Layout` and `Navbar` via props.
2. **Contact Form State (`ContactForm.jsx`)**: The `formData` object handles the controlled inputs (name, email, message). `errors` handles validation state. `isSubmitDisabled` uses the error state to disable the submit button until validation passes. `submitSuccess` manages the success message.
3. **Project Card State (`ProjectCard.jsx`)**: An independent `showDetails` state exists inside *each* `ProjectCard` instance to control the "View Details" toggle locally.
4. **Loading State (`Home.jsx`)**: The `loading` state manages the initial ~1 second loading screen.

### Side Effects (useEffect)
1. **Home Loading Simulator (`Home.jsx`)**: A `useEffect` with an empty dependency array `[]` sets a `setTimeout` for 1000ms. It has a cleanup function `clearTimeout(timer)` to prevent memory leaks if the component unmounts before the timer fires.
2. **Theme Persistence (`App.jsx`)**: A `useEffect` listens for changes to the `theme` state. When it changes, it persists the value to `localStorage` and applies the corresponding CSS class (`.dark` or `.light`) to the `document.body`. This effect runs on mount and whenever the theme changes.
3. **Form Validation (`ContactForm.jsx`)**: A `useEffect` listens for changes to the `formData` object to perform validation on every keystroke, immediately updating the `errors` object and determining if the submit button should be disabled.

### Prop Drilling
Prop drilling (at least 2 levels deep) is intentionally demonstrated on the Projects page:
- **`Projects.jsx`** imports the `projects` data and passes it via props to -> **`ProjectList.jsx`**
- **`ProjectList.jsx`** iterates over the data and passes individual project fields via props to -> **`ProjectCard.jsx`**

### Routing Structure
The application uses `react-router-dom` with a `<BrowserRouter>`. A shared `<Layout>` wraps the `<Routes>`, containing the `<Navbar>` and `<Footer>` so they persist across navigation without page reloads.

- `/Home`: The main landing page.
- `/about`: Professional details, experience, and skills.
- `/projects`: The list of all projects.
- `/projects/:projectId`: A dynamic route using `useParams()` to extract the ID and render the specific project details.
- `/contact`: The contact form page.
- `*`: A catch-all 404 Not Found route.

### Responsive Design & Accessibility
- The layout relies heavily on flexbox and CSS Grid.
- Breakpoints are established for Tablet (`max-width: 768px`) and Mobile (`max-width: 480px`).
- Semantic HTML tags (`<nav>`, `<main>`, `<section>`, `<footer>`) are used throughout the application to ensure good accessibility.
- Button elements have proper interactive states (`:hover`, `:disabled`, `:focus-visible`).
