# Issue Tracker API (Express + MongoDB)

Backend API for the **Issue Tracker Dashboard** project.  
Provides REST endpoints for creating, reading, updating, and deleting issues, with support for filtering.

Built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

##  Tech Stack

- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose  
- dotenv  
- CORS  

---

##  Project Structure

```
issue-tracker-api/
  ├── src/
  │   ├── config/
  │   │   └── db.js
  │   ├── models/
  │   │   └── Issue.js
  │   └── routes/
  │       └── issueRoutes.js
  ├── server.js
  ├── package.json
  └── .env
```

---

##  Setup & Installation

### Install dependencies
```
npm install
```

### Add environment variables
Create `.env`:

```
MONGO_URI=your_mongo_connection_string
PORT=5001
```

---

##  Run the API
```
npm run dev
```

Open:
```
http://localhost:5001/api/issues
```

---

##  API Endpoints

### GET /api/issues
Fetch all issues with optional filters:
```
/api/issues?status=open&priority=high
```

### GET /api/issues/:id
Fetch a single issue.

### POST /api/issues
Create a new issue.

### PATCH /api/issues/:id
Update issue fields.

### DELETE /api/issues/:id
Delete an issue.

---

##  Testing

You can use:
- Postman
- curl
- VSCode REST client

Example:
```
curl http://localhost:5001/api/issues
```
