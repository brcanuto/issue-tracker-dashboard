# Issue Tracker Dashboard (Angular 17)

Frontend for the **Issue Tracker Dashboard** project.  
A modern Angular 17 Single Page Application using Standalone Components, SCSS, and a clean dashboard UI.

Features:
- KPI summary cards
- Search, sorting, filtering
- Pagination
- Create, edit, delete issues
- Status & priority chips
- Responsive layout
- Back button for forms

> **Note:** This is a client-side **SPA** (no SSR/prerender) for simple and fast Netlify deployment.

---

## Tech Stack

- Angular 17 (Standalone Components)
- TypeScript
- Angular Router
- Angular HttpClient (Fetch)
- SCSS

---

## Project Structure

```
issue-tracker-dashboard/
  ├── src/app/
  │   ├── app.ts
  │   ├── app.html
  │   ├── app.config.ts
  │   ├── app.routes.ts
  │   ├── components/
  │   │   ├── issue-list/
  │   │   ├── issue-detail/
  │   │   └── issue-form/
  │   ├── services/
  │   └── models/
  ├── src/styles.scss
  ├── angular.json
  └── package.json
```

---

## Setup

```
npm install
```

### Configure API base URL

Edit `src/app/services/issue.ts`:

```ts
Local development
private baseUrl = "http://localhost:5001/api/issues";

Production (Netlify):
private baseUrl = "https://your-render-api-url.onrender.com/api/issues";
```

---

##  Run Locally

```
ng serve
```

Open:

```
http://localhost:4200
```

---

## Features

### Dashboard
- Total issues
- High-priority count
- Status breakdown

### Issue List
- Search
- Sorting
- Filtering
- Pagination
- Clickable cards

### Issue Detail
- Issue metadata
- Status update buttons
- Delete confirmation

### Create Issue
- Required field validation
- SCSS layout
- Back button


