# Personal Portfolio Full Stack Application

A modern, responsive, full stack portfolio application built with a React frontend (Vite, React Router) and a Node.js/Express backend API. This application serves dynamic project data, handles contact form submissions with server-side validation and file-based persistence, and manages loading, error, and recovery states gracefully.

## Technologies Used

- **Frontend**: React 19, Vite, React Router DOM v7, CSS Variables / Vanilla CSS
- **Backend**: Node.js, Express, CORS, Dotenv, File System (`fs/promises`)
- **Data Storage**: JSON File Persistence (`server/data/projects.json`, `server/data/contacts.json`)

---

## Environment Configuration

### Backend (`server/.env` and `server/.env.example`)
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
DATA_DIR=./data
```

### Frontend (`.env` and `.env.example`)
```env
VITE_API_URL=http://localhost:5000
```

---

## Data Storage Choice

Data is persisted server-side using structured JSON files located in the `server/data/` directory:
- `server/data/projects.json`: Stores all project items including IDs, titles, descriptions, tech stacks, image paths, feature lists, and repository links.
- `server/data/contacts.json`: Stores submitted contact messages persistently across server restarts.

---

## Open Endpoint Notice

In accordance with assignment requirements, the `GET /api/contact` endpoint is an **open endpoint** with no authentication required to allow evaluation and verification of persisted contact form submissions.

---

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Step 1: Start the Backend Server
1. Navigate into the `server` directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example` if not already present:
   ```bash
   cp .env.example .env
   ```
4. Start the Express backend:
   ```bash
   npm start
   ```
   *(or `npm run dev` for auto-reload during development)*
   
   The server will run on `http://localhost:5000`.

### Step 2: Start the Frontend Application
1. In a separate terminal, navigate to the root portfolio directory:
   ```bash
   cd portfolio
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

### Production Build
To create an optimized production build of the frontend:
```bash
npm run build
```

---

## API Documentation

### Base URL
`http://localhost:5000`

---

### 1. Health Check
- **Endpoint**: `GET /`
- **Description**: Verifies that the Express API server is active and running.
- **Response Status**: `200 OK`
- **Response Body**:
```json
{
  "status": "ok",
  "message": "Portfolio API is running"
}
```

---

### 2. Get All Projects
- **Endpoint**: `GET /api/projects`
- **Description**: Returns the list of all portfolio projects.
- **Response Status**: `200 OK`
- **Response Body**:
```json
[
  {
    "id": "timetrix",
    "title": "TimeTrix",
    "description": "Intelligent Academic Scheduling Platform designed to optimize and automate the generation of timetables using advanced algorithms.",
    "techStack": ["React", "Node.js", "Express.js", "MongoDB", "Genetic Algorithms"],
    "image": "/assets/Timetrix_photo.jpg",
    "features": [
      "Automated timetable generation",
      "Conflict resolution for classes and professors",
      "User-friendly dashboard",
      "Export schedules to various formats"
    ],
    "link": "https://github.com/Alokkumarshah/TimeTrix"
  }
]
```

---

### 3. Get Single Project by ID
- **Endpoint**: `GET /api/projects/:id`
- **Description**: Fetches details for a single project by its unique identifier.

#### Success Response (`200 OK`)
- **Example Request**: `GET /api/projects/timetrix`
- **Response Body**:
```json
{
  "id": "timetrix",
  "title": "TimeTrix",
  "description": "Intelligent Academic Scheduling Platform designed to optimize and automate the generation of timetables using advanced algorithms.",
  "techStack": ["React", "Node.js", "Express.js", "MongoDB", "Genetic Algorithms"],
  "image": "/assets/Timetrix_photo.jpg",
  "features": [
    "Automated timetable generation",
    "Conflict resolution for classes and professors",
    "User-friendly dashboard",
    "Export schedules to various formats"
  ],
  "link": "https://github.com/Alokkumarshah/TimeTrix"
}
```

#### Not Found Response (`404 Not Found`)
- **Example Request**: `GET /api/projects/nonexistent-id`
- **Response Body**:
```json
{
  "error": "Project not found"
}
```

---

### 4. Submit Contact Form Message
- **Endpoint**: `POST /api/contact`
- **Headers**: `Content-Type: application/json`
- **Description**: Validates submission fields server-side and persists the contact message.

#### Request Body
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I would like to discuss a project collaboration."
}
```

#### Success Response (`201 Created`)
```json
{
  "message": "Message sent successfully!",
  "data": {
    "id": "1789307697928",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello, I would like to discuss a project collaboration.",
    "createdAt": "2026-09-13T13:54:57.928Z"
  }
}
```

#### Validation Error Responses (`400 Bad Request`)
- **Missing Name**:
  ```json
  { "error": "Name is required." }
  ```
- **Missing Email**:
  ```json
  { "error": "Email is required." }
  ```
- **Invalid Email Format**:
  ```json
  { "error": "Invalid email format. Must contain '@' and a valid domain." }
  ```
- **Missing Message**:
  ```json
  { "error": "Message is required." }
  ```

---

### 5. List Contact Form Submissions
- **Endpoint**: `GET /api/contact`
- **Description**: Returns all received and persisted contact submissions (open verification endpoint).
- **Response Status**: `200 OK`
- **Response Body**:
```json
[
  {
    "id": "1789307697928",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello, I would like to discuss a project collaboration.",
    "createdAt": "2026-09-13T13:54:57.928Z"
  }
]
```

---

### 6. Centralized 404 & Global Error Handling
- **Undefined Route (`GET /api/doesnotexist`)**: Returns `404 Not Found`
  ```json
  {
    "error": "Route not found"
  }
  ```
- **Server / Middleware Errors**: Caught by Express error-handling middleware and returned as JSON without crashing the server:
  ```json
  {
    "error": "Internal server error"
  }
  ```

---

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
                │    ├── Projects (Fetches GET /api/projects with loading/error state)
                │    │    └── ProjectList
                │    │         └── ProjectCard (Independent "View Details" toggle)
                │    ├── ProjectDetails (Fetches GET /api/projects/:id with loading/404 state)
                │    ├── Contact
                │    │    └── ContactForm (Posts to POST /api/contact with server validation)
                │    └── NotFound (404 Page)
                └── Footer
```

### State Management & Data Fetching
- **Projects Page (`Projects.jsx`)**: Uses `useEffect` and `fetch` to request `GET /api/projects`. Manages `loading`, `error`, and `projects` state. Includes a retry mechanism for network or server failures.
- **Project Detail Page (`ProjectDetails.jsx`)**: Uses `useParams` to obtain `projectId` and calls `GET /api/projects/:id` in `useEffect`. Manages `loading`, `notFound`, `error`, and `project` state.
- **Contact Page (`ContactForm.jsx`)**: Handles controlled form state (`formData`), validation rules, `isSubmitting` status, server error alerts, and success confirmation. Submits to `POST /api/contact`.
- **Theme State (`App.jsx`)**: Persists dark/light preference to `localStorage` and toggles `.dark` / `.light` class on `document.body`.
- **Prop Drilling**: Demonstrates clean multi-level component data passing on the Projects page (`Projects` -> `ProjectList` -> `ProjectCard`).