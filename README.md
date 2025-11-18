# Issue Tracker Dashboard (MEAN Stack)

A polished, full-stack **Issue Tracking Dashboard** built with **MongoDB, Express, Angular 17 (Standalone), and Node.js**.  
This project recreates a modern SaaS-style issue management tool with a clean UI, KPIs, filtering, sorting, pagination, and full CRUD operations.

Designed as a **portfolio-quality project** to showcase full-stack development, UI/UX polish, API integration, and modern Angular architecture.

---

##  Live Demo

**Frontend (Angular):** _Coming soon…_  
**Backend (Express API):** https://issue-tracker-api.onrender.com

---

##  Tech Stack

### Frontend
- Angular 17 (Standalone Components)
- TypeScript
- SCSS
- Angular Router
- Angular HttpClient (Fetch backend enabled)
- **Deployed as a static SPA (no SSR)**

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

---

##  Project Structure

```
issue-tracker/
  ├── issue-tracker-api/        # Backend (Express + MongoDB)
  └── issue-tracker-dashboard/  # Frontend (Angular 17 SPA)
```

---

##  Local Development

### Backend

```
cd issue-tracker-api
npm install
npm run dev
```

`.env` required:

```
MONGO_URI=your_mongo_connection_string
PORT=5001
```

---

### Frontend

```
cd issue-tracker-dashboard
npm install
ng serve
```

Open:  
http://localhost:4200

---

##  API Endpoints

`GET /api/issues`  
`GET /api/issues/:id`  
`POST /api/issues`  
`PATCH /api/issues/:id`  
`DELETE /api/issues/:id`
