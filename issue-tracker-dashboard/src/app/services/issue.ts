import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable } from "rxjs"
import { Issue } from "../models/issue.model"

@Injectable({
  providedIn: "root"
})
export class IssueService {
  private baseUrl = "https://issue-tracker-dashboard.onrender.com/api/issues"

  private userKey = this.ensureUserKey()

  constructor(private http: HttpClient) {}

  private ensureUserKey(): string {
    const keyName = "issueTrackerUserKey"
    let existing = localStorage.getItem(keyName)

    if (!existing) {
      existing = `user_${Math.random().toString(36).slice(2)}_${Date.now()}`
      localStorage.setItem(keyName, existing)
    }

    return existing
  }

  private withUserKey(params?: HttpParams): HttpParams {
    let p = params ?? new HttpParams()
    return p.set("userKey", this.userKey)
  }

  getIssues(filters?: { status?: string, priority?: string }): Observable<Issue[]> {
    console.log("[IssueService] GET", this.baseUrl, "filters:", filters)

    let params = new HttpParams()
    if (filters?.status) params = params.set("status", filters.status)
    if (filters?.priority) params = params.set("priority", filters.priority)

    return this.http.get<Issue[]>(this.baseUrl, { params })
  }

  getIssue(id: string): Observable<Issue> {
    console.log("[IssueService] GET one", `${this.baseUrl}/${id}`)
    return this.http.get<Issue>(`${this.baseUrl}/${id}`)
  }

  createIssue(issue: Issue): Observable<Issue> {
    console.log("[IssueService] POST", this.baseUrl, "body:", issue)
    return this.http.post<Issue>(this.baseUrl, issue)
  }

  updateIssue(id: string, updates: Partial<Issue>): Observable<Issue> {
    console.log("[IssueService] PATCH", `${this.baseUrl}/${id}`, "updates:", updates)
    return this.http.patch<Issue>(`${this.baseUrl}/${id}`, updates)
  }

  deleteIssue(id: string): Observable<{ message: string }> {
    console.log("[IssueService] DELETE", `${this.baseUrl}/${id}`)
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
  }
}
