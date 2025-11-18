# Issue Tracker Dashboard (Angular 17)

Frontend for the **Issue Tracker Dashboard** project.  
Modern Angular 17 app using Standalone Components, SCSS, and a polished dashboard-style UI.

Features:
- KPI summary cards  
- Search, sorting, filtering  
- Pagination  
- Create, edit, delete issues  
- Status & priority chips  
- Responsive layout  

---

##  Tech Stack

- Angular 17 (Standalone)
- TypeScript  
- Angular Router  
- HttpClient (Fetch enabled)  
- SCSS  

---

##  Project Structure

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

##  Setup

```
npm install
```

### Configure API base URL

Edit `src/app/services/issue.ts`:

```ts
private baseUrl = "http://localhost:5001/api/issues";
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

##  Features

### Dashboard
- Total issues  
- Open / In Progress / Resolved / Closed  
- High priority issues  
- Status/priority chips  

### Issue List
- Search  
- Sorting  
- Filters  
- Pagination  
- Clickable cards  

### Issue Detail
- Full metadata  
- Status update buttons  
- Delete confirmation  

### Create Issue
- Required field validation  
- SCSS layout  
- Back button  
