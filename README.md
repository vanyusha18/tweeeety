<div align="center">
  <h1>🐦 Tweety - Community Event Discovery Platform</h1>
  <p>A modern, full-stack web application designed for discovering and hosting local community events with an elegant interface.</p>
</div>

<hr/>

## 📖 Overview
**Tweety** aims to solve the problem of disjointed community event management by providing a centralized application where organizers can create events, and users can seamlessly browse, search, and RSVP. The app utilizes a sleek glassmorphism design with responsive gradients for a premium user experience.

Existing solutions are either too commercial, overly complex, or lack features tailored for smaller, community-driven gatherings. Users need a streamlined way to discover what's happening locally without navigating cluttered interfaces.

## ✨ Features
- **Secure User Authentication**: Encrypted, JWT-based login and registration flow.
- **Event Management**: Private dashboards for organizers to Create, Read, Update, and Delete local events.
- **Real-time Event Discovery**: Live search and intuitive category filters applied instantly.
- **Interactive RSVP System**: Users can easily RSVP; attendance counts are tracked dynamically to measure popularity.
- **Smart Badges System**:
  - **🔥 Happening Soon**: Automatically flags events starting within the next 48 hours.
  - **⭐ Trending**: Automatically flags events with 10 or more RSVPs.
- **Modern UI & UX**: Comprehensive handling of edge cases (empty dashboards, search zero-states) paired with satisfying visual feedback.

## 🛠️ Technology Stack
| Layer        | Technologies Used                               |
|--------------|-------------------------------------------------|
| **Frontend** | HTML5, CSS3 (Glassmorphism), Vanilla JavaScript |
| **Backend**  | Node.js, Express.js                             |
| **Database** | MongoDB & Mongoose ORM                          |

## 🚀 Setup & Run Instructions

### Prerequisites
1. **Node.js** (v14+ is recommended)
2. **MongoDB** installed locally (running on port `27017`) or a MongoDB Atlas connection string.

### 1. Database Configuration
Open `backend/.env` (duplicate `.env.example` if it doesn't exist) and set your database URL:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/tweety
JWT_SECRET=supersecretkey123
```

### 2. Run the Application
The backend serves the frontend statically, so you only need to run the backend.
```bash
cd backend
npm install
npm start
```
*The application will be accessible at http://localhost:5000.*

## 🌐 Deployment
**Live Application Demo:** [Insert Deployment Link Here]

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions on how to deploy this application for free on Render.

## 👥 Team
- **[Your Name]** - Full-Stack Developer - [GitHub/Portfolio Link]
- **[Teammate Name]** - [Role] - [GitHub/Portfolio Link]

---
*Developed with ❤️ as a Community Event Full-Stack Solution.*
