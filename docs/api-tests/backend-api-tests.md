# Backend API Testing Documentation (B1–B7)

This document contains executable `curl` commands and test specifications for all seven backend requirements (B1–B7) implemented in the Express backend, including success cases and failure cases for all validated endpoints.

---

## 1. B1 — Express Server Setup & Health Check

### Test 1.1: Health Check Endpoint (Success)
- **Requirement**: B1 — Express Server Setup & Health Check
- **Description**: Verifies that the Express API is running and accessible on the configured port.
- **HTTP Method & URL**: `GET http://localhost:5000/`
- **Expected HTTP Status**: `200 OK`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/
  ```
- **Actual Response**:
  ```json
  {
    "status": "ok",
    "message": "Portfolio API is running"
  }
  ```

---

## 2. B2 — Serve Project List

### Test 2.1: Fetch All Projects (Success)
- **Requirement**: B2 — GET /api/projects — Serve Project List
- **Description**: Retrieves the complete list of projects from the backend JSON storage.
- **HTTP Method & URL**: `GET http://localhost:5000/api/projects`
- **Expected HTTP Status**: `200 OK`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/api/projects
  ```
- **Actual Response**:
  ```json
  [
    {
      "id": "timetrix",
      "title": "TimeTrix",
      "description": "Intelligent Academic Scheduling Platform designed to optimize and automate the generation of timetables using advanced algorithms.",
      "techStack": [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Genetic Algorithms"
      ],
      "image": "/assets/Timetrix_photo.jpg",
      "features": [
        "Automated timetable generation",
        "Conflict resolution for classes and professors",
        "User-friendly dashboard",
        "Export schedules to various formats"
      ],
      "link": "https://github.com/Alokkumarshah/TimeTrix"
    },
    {
      "id": "snaco",
      "title": "SNACO",
      "description": "Smart Campus Navigation System providing real-time routing and interactive maps for students and staff on campus.",
      "techStack": [
        "React",
        "Node.js",
        "MongoDB",
        "Mapbox"
      ],
      "image": "/assets/SNACO_photo.jpg",
      "features": [
        "Real-time location tracking",
        "Custom routing between campus buildings",
        "Interactive 3D maps using Mapbox",
        "Mobile-friendly interface"
      ],
      "link": "https://github.com/AkshayyVishnu/SNAC0"
    },
    {
      "id": "url-shortener",
      "title": "URL Shortener",
      "description": "A fast and secure URL shortener service with user authentication and analytics tracking for shortened links.",
      "techStack": [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT"
      ],
      "image": "/assets/URL_shortner.png",
      "features": [
        "Custom alias generation",
        "Click analytics and tracking",
        "User authentication with JWT",
        "Fast redirection"
      ],
      "link": "https://github.com/SohamMahaj/UrlShortner"
    },
    {
      "id": "shopverse",
      "title": "ShopVerse",
      "description": "A comprehensive e-commerce application featuring product management, a shopping cart, and secure payment processing.",
      "techStack": [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Cloudinary",
        "Stripe"
      ],
      "image": "/assets/ecommerce_photo.jpg",
      "features": [
        "Full product catalog with search and filtering",
        "Shopping cart and order history",
        "Stripe payment integration",
        "Admin dashboard for product and order management"
      ],
      "link": "https://github.com/SohamMahaj/Shopverse"
    }
  ]
  ```

---

## 3. B3 — Serve Single Project by ID

### Test 3.1: Fetch Single Project by Valid ID (Success)
- **Requirement**: B3 — GET /api/projects/:id — Serve a Single Project
- **Description**: Retrieves a single project matching the provided `projectId`.
- **HTTP Method & URL**: `GET http://localhost:5000/api/projects/timetrix`
- **Expected HTTP Status**: `200 OK`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/api/projects/timetrix
  ```
- **Actual Response**:
  ```json
  {
    "id": "timetrix",
    "title": "TimeTrix",
    "description": "Intelligent Academic Scheduling Platform designed to optimize and automate the generation of timetables using advanced algorithms.",
    "techStack": [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Genetic Algorithms"
    ],
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

### Test 3.2: Fetch Project with Non-Existent ID (Failure / 404)
- **Requirement**: B3 — GET /api/projects/:id — Serve a Single Project
- **Description**: Returns a structured JSON 404 error when a requested project ID does not exist.
- **HTTP Method & URL**: `GET http://localhost:5000/api/projects/unknown-project-id`
- **Expected HTTP Status**: `404 Not Found`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/api/projects/unknown-project-id
  ```
- **Actual Response**:
  ```json
  {
    "error": "Project not found"
  }
  ```

---

## 4. B4 — Handle Contact Form Submissions

### Test 4.1: Submit Valid Contact Message (Success)
- **Requirement**: B4 — POST /api/contact — Handle Contact Form Submissions
- **Description**: Accepts and persists a valid contact form submission with name, email, and message.
- **HTTP Method & URL**: `POST http://localhost:5000/api/contact`
- **Expected HTTP Status**: `201 Created`
- **curl Command**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Bob Builder\",\"email\":\"bob@example.com\",\"message\":\"Inquiry about project availability\"}"
  ```
- **Actual Response**:
  ```json
  {
    "message": "Message sent successfully!",
    "data": {
      "id": "1789310718978",
      "name": "Bob Builder",
      "email": "bob@example.com",
      "message": "Inquiry about project availability",
      "createdAt": "2026-09-13T14:45:18.978Z"
    }
  }
  ```

### Test 4.2: Missing Name Field (Failure / 400)
- **Requirement**: B4 — POST /api/contact — Handle Contact Form Submissions
- **Description**: Returns a 400 Bad Request error when the name field is empty.
- **HTTP Method & URL**: `POST http://localhost:5000/api/contact`
- **Expected HTTP Status**: `400 Bad Request`
- **curl Command**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"\",\"email\":\"bob@example.com\",\"message\":\"Hello\"}"
  ```
- **Actual Response**:
  ```json
  {
    "error": "Name is required."
  }
  ```

### Test 4.3: Missing Email Field (Failure / 400)
- **Requirement**: B4 — POST /api/contact — Handle Contact Form Submissions
- **Description**: Returns a 400 Bad Request error when the email field is empty.
- **HTTP Method & URL**: `POST http://localhost:5000/api/contact`
- **Expected HTTP Status**: `400 Bad Request`
- **curl Command**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Bob\",\"email\":\"\",\"message\":\"Hello\"}"
  ```
- **Actual Response**:
  ```json
  {
    "error": "Email is required."
  }
  ```

### Test 4.4: Invalid Email Format (Failure / 400)
- **Requirement**: B4 — POST /api/contact — Handle Contact Form Submissions
- **Description**: Returns a 400 Bad Request error when the email string is missing '@' or a valid domain structure.
- **HTTP Method & URL**: `POST http://localhost:5000/api/contact`
- **Expected HTTP Status**: `400 Bad Request`
- **curl Command**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Bob\",\"email\":\"invalid-email-string\",\"message\":\"Hello\"}"
  ```
- **Actual Response**:
  ```json
  {
    "error": "Invalid email format. Must contain '@' and a valid domain."
  }
  ```

### Test 4.5: Missing Message Field (Failure / 400)
- **Requirement**: B4 — POST /api/contact — Handle Contact Form Submissions
- **Description**: Returns a 400 Bad Request error when the message field is empty.
- **HTTP Method & URL**: `POST http://localhost:5000/api/contact`
- **Expected HTTP Status**: `400 Bad Request`
- **curl Command**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Bob\",\"email\":\"bob@example.com\",\"message\":\"\"}"
  ```
- **Actual Response**:
  ```json
  {
    "error": "Message is required."
  }
  ```

---

## 5. B5 — List Contact Form Submissions (Verification)

### Test 5.1: List All Submissions (Success)
- **Requirement**: B5 — GET /api/contact — List Submissions (for verification)
- **Description**: Retrieves all submissions stored in `server/data/contacts.json`. (Open endpoint without authentication for evaluation).
- **HTTP Method & URL**: `GET http://localhost:5000/api/contact`
- **Expected HTTP Status**: `200 OK`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/api/contact
  ```
- **Actual Response**:
  ```json
  [
    {
      "id": "1789307697928",
      "name": "Alice Smith",
      "email": "alice@example.com",
      "message": "Testing contact form integration",
      "createdAt": "2026-09-13T13:54:57.928Z"
    },
    {
      "id": "1789310718978",
      "name": "Bob Builder",
      "email": "bob@example.com",
      "message": "Inquiry about project availability",
      "createdAt": "2026-09-13T14:45:18.978Z"
    }
  ]
  ```

---

## 6. B6 — Centralized Error Handling & 404s

### Test 6.1: Catch-All 404 for Undefined Routes (Failure / 404)
- **Requirement**: B6 — Centralized Error Handling & 404s
- **Description**: Verifies that any unmapped route returns a standard JSON error rather than an unhandled HTML page.
- **HTTP Method & URL**: `GET http://localhost:5000/api/doesnotexist`
- **Expected HTTP Status**: `404 Not Found`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/api/doesnotexist
  ```
- **Actual Response**:
  ```json
  {
    "error": "Route not found"
  }
  ```

### Test 6.2: Global Express Error Handler for Malformed Requests (Failure / 400)
- **Requirement**: B6 — Centralized Error Handling & 404s
- **Description**: Verifies that malformed JSON payloads are caught by the global error-handling middleware without crashing the server process.
- **HTTP Method & URL**: `POST http://localhost:5000/api/contact`
- **Expected HTTP Status**: `400 Bad Request`
- **curl Command**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{malformedJson:"
  ```
- **Actual Response**:
  ```json
  {
    "error": "Expected property name or '}' in JSON at position 1 (line 1 column 2)"
  }
  ```

---

## 7. B7 — CORS & Environment Configuration

### Test 7.1: CORS Preflight Request from Allowed Frontend Origin (Success)
- **Requirement**: B7 — CORS & Environment Configuration
- **Description**: Verifies that the Express API responds with appropriate CORS headers (`Access-Control-Allow-Origin: http://localhost:5173`) when the React frontend dev server connects.
- **HTTP Method & URL**: `OPTIONS http://localhost:5000/api/projects`
- **Expected HTTP Status**: `204 No Content`
- **curl Command**:
  ```bash
  curl -i -X OPTIONS http://localhost:5000/api/projects \
    -H "Origin: http://localhost:5173" \
    -H "Access-Control-Request-Method: GET"
  ```
- **Actual Response Headers**:
  ```http
  HTTP/1.1 204 No Content
  Access-Control-Allow-Origin: http://localhost:5173
  Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
  Access-Control-Allow-Headers: Content-Type,Authorization
  ```

### Test 7.2: CORS Rejection for Unauthorized Origin (Failure / 403)
- **Requirement**: B7 — CORS & Environment Configuration
- **Description**: Verifies that origins not allowed by the server policy are rejected.
- **HTTP Method & URL**: `GET http://localhost:5000/api/projects`
- **Expected HTTP Status**: `403 Forbidden`
- **curl Command**:
  ```bash
  curl -i http://localhost:5000/api/projects \
    -H "Origin: http://unauthorized-domain.com"
  ```
- **Actual Response**:
  ```json
  {
    "error": "CORS policy violation"
  }
  ```
