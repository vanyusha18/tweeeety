# tweety - Community Event Discovery Platform

A modern, full-stack web application designed for discovering and hosting local community events. Built with a clean, student-friendly interface utilizing glassmorphism and modern gradient backgrounds.

## Features
- **User Authentication:** JWT-based secure login and registration.
- **Event Management:** Authenticated users can create, manage, and delete their own events.
- **Event Discovery:** Public listing of events with live, no-reload search and category filtering.
- **RSVP System:** Users can declare attendance, dynamically increasing the event's popularity score.
- **Smart Badges ("WOW Feature"):** 
  - `🔥 Happening Soon`: Automatically applied to events starting within 48 hours.
  - `⭐ Trending`: Automatically applied to events with 10 or more RSVPs.
- **Modern UI Edge Cases Handled:** Empty dashboards, search zero-states, and loading visual feedback.

## Tech Stack
- **Frontend:** HTML5, CSS3 (Vanilla, Custom Design System), Vanilla JavaScript.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (via Mongoose).

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB running locally on port 27017 (or a MongoDB Atlas URI)

### 1. Database Setup
Ensure your local MongoDB instance is running. If using a cloud database, update `MONGODB_URI` in `backend/.env`.

### 2. Backend Initialization
Open a terminal in the `backend` folder:
```bash
cd backend
npm install

# Optional: Seed the database with sample data
npm run seed

# Start the server (runs on Port 5000)
npm start
```

### 3. Frontend Initialization
The frontend is pure static HTML/CSS/JS. You can run it using any simple HTTP server.
For example, using the `serve` package:
```bash
# In a new terminal
cd frontend
npx serve
```
Then navigate to `http://localhost:3000` (or whatever port `serve` assigns).

## Project Structure
- `/backend`: Contains the REST API, Mongoose models, and authentication middleware.
- `/frontend`: Contains the vanilla HTML interface, CSS files for styling, and JS files for API interaction and UI logic.
- `seed.js`: A helper script in the backend to populate the DB with initial testing state.

## Notes
- To test the "Trending" badge, log in as different users to RSVP to an event, or run the `seed.js` script to instantly generate a pre-rated events database.
- Uses `localStorage` for JWT authentication on the client side.
