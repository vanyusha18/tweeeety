<div align="center">
  <h1>🐦 Tweety - Community Event Discovery Platform</h1>
  <p>A modern, full-stack web application designed for discovering and hosting local community events with an elegant interface.</p>
</div>

<hr/>

## 📖 Overview
**Tweety** aims to solve the problem of disjointed community event management by providing a centralized application where organizers can create events, and users can seamlessly browse, search, and RSVP. The app utilizes a sleek glassmorphism design with responsive gradients for a premium user experience.

## ✨ Features
- **Secure User Authentication**: Encrypted, JWT-based login and registration flow.
- **Event Management**: Private dashboards for organizers to Create, Read, Update, and Delete local events.
- **Real-time Event Discovery**: Live search and intuitive category filters applied instantly.
- **RSVP Tracking System**: Users can easily RSVP; attendance counts are tracked dynamically to measure popularity.
- **Smart Badges System**:
  - **🔥 Happening Soon**: Automatically flags events starting within the next 48 hours.
  - **⭐ Trending**: Automatically flags events with 10 or more RSVPs.
- **Modern UI & UX**: Comprehensive handling of edge cases (empty dashboards, search zero-states) paired with satisfying visual feedback.

## 🛠️ Technology Stack
| Layer        | Technologies Used                               |
|--------------|-------------------------------------------------|
| **Frontend** | HTML5, CSS3 (Custom Glassmorphism Design System), Vanilla JavaScript |
| **Backend**  | Node.js, Express.js                             |
| **Database** | MongoDB & Mongoose ORM                          |

## 🚀 Setup & Run Instructions

### Prerequisites
1. **Node.js** (v14+ is recommended)
2. **MongoDB** installed locally (running on port `27017`) or a MongoDB Atlas connection string.

### 1. Database Configuration
By default, the backend expects a local database. If you are using a cloud MongoDB instance, open `backend/.env` and update the `MONGODB_URI` line:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventdb
JWT_SECRET=your_jwt_secret
```

### 2. Backend Initialization
Open a local terminal, navigate to the `backend` folder, install dependencies, and start the local server.
```bash
cd backend
npm install

# Optional: To seed the database with initial sample test data
npm run seed

# Start the application server
npm start
```
*The backend server will run on http://localhost:5000.*

### 3. Frontend Initialization
Because the frontend uses standard HTML/CSS/Vanilla JS, it can be run using any static local server capability.

**Option A - Quickest (using Python or serve):**
```bash
cd frontend

# Using serve
npx serve

# Or using python
python -m http.server 3000
```
Then, open your browser and navigate to the local interface (usually `http://localhost:3000`).

**Option B - Using an IDE:**
If you are using **VS Code**, you can simply utilize the **Live Server** extension by right-clicking `frontend/index.html` and selecting "Open with Live Server".

## 📁 Project Structure
```text
/backend
 ├── /models         # Mongoose User and Event schemas
 ├── /routes         # API endpoint definitions 
 ├── /middleware     # Authentication verification
 ├── /scripts        # Database seeders
 ├── server.js       # Express server configuration
 └── package.json    # NodeJS dependencies
/frontend
 ├── /css            # Custom UI styles (design system base, utility classes)
 ├── /js             # Client-side API interactions and view logic
 └── *.html          # Views (index, dashboard, create-event, etc.)
README.md            # App documentation
PROJECT_REPORT.md    # Formal academic documentation 
```

## 📝 Demo & Submission Notes
- To demonstrate the "⭐ Trending" dynamic badge, log in as different individuals and RSVP, or execute the `npm run seed` application in the backend to instantly generate test entries.
- To package the project entirely for project guides and judges (without heavy node modules), refer to the provided script (`package_for_submission.ps1`).

---
*Developed with ❤️ as a Community Event Full-Stack Solution.*
