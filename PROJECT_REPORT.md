# Project Report: Tweety - Community Event Discovery Platform

## 1. Introduction
**Tweety** is a modern, full-stack web application designed to simplify the discovery and hosting of local community events. Built with a focus on user experience, it features a clean, intuitive interface utilizing glassmorphism and modern gradient backgrounds, ensuring it is both engaging and accessible to all users.

## 2. Problem Statement
Community organizers often struggle to find a centralized, user-friendly platform to host and promote their local events. Existing solutions are either too commercial, overly complex, or lack features tailored for smaller, community-driven gatherings. Users need a streamlined way to discover what's happening locally without navigating cluttered interfaces.

## 3. Objective
To develop a responsive, full-stack web application where:
- Organizers can seamlessly create and manage events.
- Users can easily discover, search, and RSVP to local events.
- The platform automatically highlights trending and upcoming events to boost engagement.

## 4. Key Features
1. **User Authentication & Authorization**: Secure, JWT-based login and registration system. Passwords are encrypted for security.
2. **Event Management (CRUD)**: Authenticated users (organizers) can construct, read, update, and manage their own events.
3. **Real-time Event Discovery**: A public listing of events enriched with live, no-reload search functionality and category filtering.
4. **Interactive RSVP System**: Users can RSVP to events they wish to attend. The system dynamically tracks attendance to determine event popularity.
5. **Smart Badging System**:
   - **🔥 Happening Soon**: Automatically flags events starting within the next 48 hours.
   - **⭐ Trending**: Automatically flags events that have garnered 10 or more RSVPs.
6. **Polished UI/UX**: Robust handling of edge cases, including empty dashboards, "no results found" search states, and visual loading feedback.

## 5. Technology Stack
- **Frontend**:
  - HTML5 & CSS3: Utilizing a custom design system with modern Vanilla CSS styling (Glassmorphism, CSS Variables, Flexbox/Grid).
  - JavaScript (Vanilla): Client-side routing, DOM manipulation, and asynchronous API communication.
- **Backend**:
  - Node.js & Express.js: Robust, scalable RESTful API architecture.
  - Authentication: JSON Web Tokens (JWT) and bcrypt for secure user session management.
- **Database**:
  - MongoDB & Mongoose: NoSQL database modeling for flexible schema design and rapid iteration.

## 6. System Architecture
The application follows a standard Client-Server architecture:
- **Client (Frontend)**: Interacts with the user, validates input, and sends asynchronous HTTP requests to the backend using the Fetch API. State is managed locally (e.g., storing JWT in `localStorage`).
- **Server (Backend)**: An Express app that exposes modular REST API endpoints (`/api/auth`, `/api/events`). It validates incoming requests, enforces authentication via middleware, interacts with the database, and returns JSON responses.
- **Database (MongoDB)**: Stores structured documents for `Users` and `Events`. Relational references are maintained (e.g., an Event document references its creator's User ID).

## 7. Setup & Run Instructions
*(Please refer to the `README.md` file for comprehensive, step-by-step setup commands.)*
Brief overview:
1. Ensure Node.js and MongoDB are installed.
2. Start the MongoDB service.
3. Navigate to the `/backend` directory, run `npm install`, and then `npm start`.
4. Run the frontend using any static file server (e.g., `npx serve`) directly from the `/frontend` directory.

## 8. Conclusion
Tweety successfully bridges the gap between community organizers and local attendees. By providing a secure, reliable, and aesthetically pleasing platform, it encourages local engagement and simplifies event management. The modular architecture ensures the application is highly maintainable and ready for future feature expansions, such as integrated payment gateways or advanced location-based filtering.
