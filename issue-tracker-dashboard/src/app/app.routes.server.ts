import { Routes } from "@angular/router";
import { routes } from "./app.routes";

export const serverRoutes: Routes = routes.map((route) =>
  route.path === "issues/:id"
    ? {
        ...route,
        renderMode: "client"
      }
    : route
)