# 🚀 AI-Powered Job Match Platform
A full-stack platform where users can sign up, create a profile, view job openings, and receive AI-powered job recommendations tailored to their skills and experience.

# 🚀 Setup Instructions
Clone the Repository
bash git clone https://github.com/codewithhappyy/AI-Recruitr.git cd AI-Recruitr

## Backend Setup Install dependencies:
bash cd server npm install Create a .env file with your Gemini API key, JWT token secret, and MongoDB URL.

## Start the backend server:

bash nodemon server.js

## Frontend Setup In a new terminal window:
bash cd client npm install npm run dev

# 🖥️ Frontend Structure
Built with React (using Vite) and Tailwind CSS for a modern, responsive UI.

## Key Components

### Authentication

Register.jsx: Handles user signup with form validation.

Login.jsx: Manages JWT-based authentication flow.

ProtectedRoute.js: Guards authenticated routes.

### Profile Management

Profile.jsx: Fetches user details from /api/user and displays the profile.

ProfileEdit.jsx: Allows editing and saving the user profile.

### Job Listings

Jobs.jsx: Fetches and displays all available jobs from the database.

Recommended Jobs

RecommendedJobs.jsx: Displays AI-generated job matches in a clean card layout.

### Header

Header.jsx: Triggers fetching of AI-generated job matches from the backend via /api/job-matches and passes data to RecommendedJobs.jsx.

### Technical Choices
React Router for navigation

Axios for API communication

Local Storage for JWT persistence

Tailwind CSS for responsive design

# ⚙️ Backend Structure
Built with Express.js and MongoDB for robust API and data management.

## Core Modules
### Authentication Middleware

Handles JWT authentication and route protection.

### Data Models

UserModel: User registration and authentication.

ProfileModel: User profile data.

JobModel: Job listings.

Routing Handlers

jobRoutes.js: Handles API routes.

## AI Integration Service
Handles prompt construction, AI API requests, and response processing.

# 🔄 AI Integration Data Flow
User submits their profile → Frontend POSTs to /api/job-matches

### Backend:
Validates user input

Constructs a prompt for Gemini AI

Calls the Gemini AI API

Sanitizes and parses the AI response

Frontend receives structured job match data and renders it in the UI

# 📡 API Documentation
## POST /register
Registers a new user.

## POST /login
Authenticates user and returns a JWT token.

## POST /profileUpdate
Updates and returns the user profile.

## GET /api/jobs
Returns all available jobs in the database.

## GET /api/user-data
Returns the current user's profile data.

## POST /api/job-matches
Returns top job matches for a given user profile.

# ⚖️ Trade-offs & Assumptions
### AI Output Handling:
The AI may return JSON inside markdown code blocks. The backend strips these before parsing. If the AI returns malformed JSON, the backend responds with an error.

### Skills Format:
Skills are returned as a comma-separated string. The frontend splits this string for display.

### Salary Format:
Salary may be a string (e.g., "600000-1200000"). The frontend displays it as-is.

### Strict Prompting:
The AI prompt is designed to minimize hallucination and enforce JSON output, but the backend still validates and sanitizes responses.

### Extensibility:
The code is modular and can be easily extended to support more fields or different AI models in the future.

# 🏗️ Code Architecture Overview
AI-Recruitr/ 
│ 
├── server/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── utils/
│ ├── client/
│ ├── src/ 
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── utils/
│ └── ... │ └── README.md

## Frontend: 
Handles all user interactions, state management, and API communication. Uses React Router for navigation and Tailwind CSS for styling.

## Backend: 
Manages authentication, user profiles, job data, and AI integration. Exposes RESTful endpoints and ensures data validation and security.

## AI Service: 
Isolated logic for prompt engineering, calling the Gemini API, and parsing/validating AI responses
