# Deployment Guide (Render)

Since your project consists of a Node.js/Express backend that statically serves your HTML/JS frontend, the absolute best and fastest free hosting solution is **Render**. You can deploy it as a single "Web Service".

## 1. Push to GitHub
First, you need to push your local repository to GitHub.
If you haven't created a GitHub repository yet, go to [GitHub](https://github.com/new) and create a new empty repository (do not add a README, .gitignore, or license).

Then run these commands in your local project terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

## 2. Set up MongoDB Atlas (Cloud Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account/cluster.
2. In Database Access, create a database user with a username and password.
3. In Network Access, whitelist all IPs (`0.0.0.0/0`) so Render can connect.
4. Click Connect -> "Connect your application" and copy the connection string. It will look like: 
   `mongodb+srv://<username>:<password>@cluster0.../tweety?retryWrites=true&w=majority`

## 3. Deploy to Render
1. Go to [Render](https://render.com) and create an account using GitHub.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your repository.
4. Fill in the deployment details:
   - **Name**: `tweety-app` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: (Choose the closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: This tells Render to run commands inside the backend folder)*
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Scroll down to **Advanced** and click **Add Environment Variable**. Add the following:
   - Key: `MONGODB_URI` | Value: `(Your MongoDB Atlas Connection String)`
   - Key: `JWT_SECRET`  | Value: `(Any secure random string for authentication)`
6. Click **Create Web Service**.

## 4. Final Steps
Render will now build and deploy your app. It takes about 2-3 minutes.
Once finished, you will see a green "Live" badge and a URL (e.g., `https://tweety-app.onrender.com`).
Click the URL to access your fully deployed application!

**Don't forget to put this URL in your README.md!**
