import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router } from "@angular/router"
import { Issue } from "../../models/issue.model"
import { IssueService } from "../../services/issue"

@Component({
  selector: "app-issue-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./issue-detail.html",
  styleUrl: "./issue-detail.scss"
})
export class IssueDetailComponent implements OnInit {
  issue: Issue | null = null
  isLoading = false
  errorMessage = ""
  isDeleting = false
  deleteError = ""
  searchTerm = ""
  sortOption: "newest" | "oldest" | "priority-high" = "newest"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.fetchIssue(id)
    }
  }

  fetchIssue(id: string): void {
    console.log("[IssueDetail] Loading issue", id)
    this.isLoading = true
    this.errorMessage = ""
    this.issue = null

    const timeoutId = setTimeout(() => {
      if (this.isLoading) {
        this.errorMessage =
          "This is taking longer than expected. You can try again or go back to the issue list.";
      }
    }, 45000)

    this.issueService.getIssue(id).subscribe({
      next: (data) => {
        console.log("[IssueDetail] Loaded:", data)
        clearTimeout(timeoutId)
        this.issue = data
        this.isLoading = false
      },
      error: () => {
        clearTimeout(timeoutId)
        this.errorMessage = "Failed to load issue. Please try again or go back."
        this.isLoading = false
      }
    })
  }

  updateStatus(status: Issue["status"]): void {
    if (!this.issue || !this.issue._id) return

    console.log("[IssueDetail] Updating status to:", status)

    this.issueService.updateIssue(this.issue._id, { status }).subscribe({
      next: (updated) => {
        console.log("[IssueDetail] Updated:", updated)
        this.issue = updated
      },
      error: () => {
        this.errorMessage = "Failed to update status"
      }
    })
  }

  goBack(): void {
    this.router.navigate(["/issues"])
  }

  deleteIssue(): void {
    if (!this.issue || !this.issue._id) return

    const confirmed = window.confirm(
      "Are you sure you want to delete this issue? This cannot be undone."
    )
    if (!confirmed) return

    this.isDeleting = true
    this.deleteError = ""
    console.log("[IssueDetail] Deleting issue", this.issue._id)

    this.issueService.deleteIssue(this.issue._id).subscribe({
      next: () => {
        this.isDeleting = false
        this.router.navigate(["/issues"])
      },
      error: (err) => {
        console.error("[IssueDetail] delete error:", err)
        this.deleteError = "Failed to delete issue"
        this.isDeleting = false
      }
    })
}
}
