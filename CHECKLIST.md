# 🎉 Pre-Submission Checklist

Before finalizing your hackathon submission, run through this checklist to ensure everything works perfectly and your presentation is professional.

## 1. Local Testing
- [ ] **Full Flow Test**: Register a new user, log in, create an event, browse events, and RSVP to an event.
- [ ] **Validation Check**: Try submitting empty forms or invalid emails to ensure error messages appear.
- [ ] **Empty States**: Verify that the dashboard looks good even when there are no events created.
- [ ] **Dynamic Features**: Create 10 RSVPs for a single event (e.g. using seed data) to verify the "⭐ Trending" badge appears.
- [ ] **Responsiveness**: Resize your browser window to simulate mobile/tablet views and ensure the UI looks good.

## 2. API & Secrets
- [ ] Ensure `API_URL` in `frontend/js/api.js` is set to `/api` (or your live backend URL if split).
- [ ] Ensure you did **NOT** commit your actual `.env` file (verify it's in `.gitignore`).
- [ ] Verify `.env.example` exists and has placeholder values.

## 3. GitHub Repository
- [ ] All code is committed (`git status` shows working tree clean).
- [ ] Repository is **Public** (judges need to see it!).
- [ ] `README.md` is populated with a catchy title, description, and the **Live Deployment URL**.

## 4. Live Deployment
- [ ] Visit your live deployment URL (e.g., Render/Vercel).
- [ ] Create a test user on the live site to ensure the MongoDB connection works.
- [ ] Check the browser console (F12) on the live site to ensure there are no CORS or mixed content (HTTP/HTTPS) errors.

## 5. Hackathon Deliverables
- [ ] **Demo Video**: Record a 2-3 minute loom/demo walking through the core features.
- [ ] **Submission Form**: Ensure team details, repo link, and live demo link are correctly inputted on the hackathon platform.

**Good luck with your submission! 🚀**
