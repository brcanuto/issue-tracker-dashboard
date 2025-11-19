import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { Issue } from "../../models/issue.model"
import { IssueService } from "../../services/issue"

type SortOption = "newest" | "oldest" | "priority-high"

@Component({
  selector: "app-issue-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./issue-list.html",
  styleUrl: "./issue-list.scss"
})
export class IssueListComponent implements OnInit {
  allIssues: Issue[] = []
  issues: Issue[] = []

  statusFilter = ""
  priorityFilter = ""

  searchTerm = ""
  sortOption: SortOption = "newest"
  
  stats = {
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    highPriorityOpen: 0
  }

  pageSize = 5
  currentPage = 1
  totalPages = 1

  isLoading = false
  errorMessage = ""

  

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.fetchIssues()
  }

  fetchIssues(): void {

    this.isLoading = true
    this.errorMessage = ""

    this.issueService
      .getIssues({
        status: this.statusFilter || undefined,
        priority: this.priorityFilter || undefined
      })
      .subscribe({
        next: (data) => {
          this.allIssues = data
          this.recomputeStats()
          this.currentPage = 1
          this.applyFiltersAndSort()
          this.isLoading = false
        },
        error: (err) => {
          this.errorMessage = "Failed to load issues"
          this.isLoading = false
        }
      })
  }

  onFiltersChange(): void {
    this.fetchIssues()
  }

  onSearchChange(): void {
    this.currentPage = 1
    this.applyFiltersAndSort()
  }

  onSortChange(): void {
    this.currentPage = 1
    this.applyFiltersAndSort()
  }

  private applyFiltersAndSort(): void {
    let result = [...this.allIssues]

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase()
      result = result.filter((issue) => {
        const title = (issue.title || "").toLowerCase()
        const desc = (issue.description || "").toLowerCase()
        return title.includes(term) || desc.includes(term)
      })
    }

    const getTime = (d?: string) => (d ? new Date(d).getTime() : 0)

    const priorityRank: Record<string, number> = { high: 0, medium: 1, low: 2 }

    switch (this.sortOption) {
      case "oldest":
        result.sort((a, b) => getTime(a.createdAt) - getTime(b.createdAt))
        break

      case "priority-high":
        result.sort((a, b) => {
          const pa = priorityRank[a.priority] ?? 99
          const pb = priorityRank[b.priority] ?? 99
          if (pa !== pb) return pa - pb
          return getTime(b.createdAt) - getTime(a.createdAt)
        })
        break

      case "newest":
      default:
        result.sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt))
        break
    }

      const total = result.length
      this.totalPages = Math.max(1, Math.ceil(total / this.pageSize))
    
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages
      }
      if (this.currentPage < 1) {
        this.currentPage = 1
      }
    
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      const pageSlice = result.slice(start, end)
    

    
    this.issues = pageSlice
  }

  goToNewIssue(): void {
    this.router.navigate(["/issues/new"])
  }

  goToIssue(id: string | undefined): void {
    if (!id) return
    this.router.navigate(["/issues", id])
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return
    this.currentPage = page
    this.applyFiltersAndSort()
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.applyFiltersAndSort()
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.applyFiltersAndSort()
    }
  }

  private recomputeStats(): void {
    const list = this.allIssues
  
    const open = list.filter((i) => i.status === "open").length
    const inProgress = list.filter((i) => i.status === "in_progress").length
    const resolved = list.filter((i) => i.status === "resolved").length
    const closed = list.filter((i) => i.status === "closed").length
    const highPriorityOpen = list.filter(
      (i) => i.status === "open" && i.priority === "high"
    ).length
  
    this.stats = {
      total: list.length,
      open,
      inProgress,
      resolved,
      closed,
      highPriorityOpen
    }
  
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }
  
  
}
