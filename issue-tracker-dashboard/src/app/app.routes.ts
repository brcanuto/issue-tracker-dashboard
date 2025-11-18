import { Routes } from "@angular/router"
import { IssueListComponent } from "./components/issue-list/issue-list"
import { IssueDetailComponent } from "./components/issue-detail/issue-detail"
import { IssueFormComponent } from "./components/issue-form/issue-form"

export const routes: Routes = [
  { path: "", redirectTo: "issues", pathMatch: "full" },
  { path: "issues", component: IssueListComponent },
  { path: "issues/new", component: IssueFormComponent },
  { path: "issues/:id", component: IssueDetailComponent }
]
