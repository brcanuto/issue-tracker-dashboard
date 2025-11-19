import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { IssueService } from "../../services/issue"
import { Issue } from "../../models/issue.model"

@Component({
  selector: "app-issue-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./issue-form.html",
  styleUrl: "./issue-form.scss"
})
export class IssueFormComponent {
  issue: Issue = {
    title: "",
    description: "",
    status: "open",
    priority: "medium",
    assignedTo: "",
    createdBy: ""
  }

  isSubmitting = false
  errorMessage = ""

  constructor(private issueService: IssueService, private router: Router) {}

  onSubmit(): void {
    if (!this.issue.title || !this.issue.description) {
      this.errorMessage = "Title and description are required"
      return
    }

    this.isSubmitting = true
    this.errorMessage = ""


    this.issueService.createIssue(this.issue).subscribe({
      next: (created) => {
        this.isSubmitting = false
        this.router.navigate(["/issues"])
      },
      error: (err) => {
        this.errorMessage = "Failed to create issue"
        this.isSubmitting = false
      }
    })
  }

  goBack(): void {
    this.router.navigate(["/issues"]);
  }
}
