import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable } from "rxjs"
import {Issue} from "../models/issue.model"

@Injectable({
  providedIn:"root"
})
export class IssueService {
  private baseUrl = "https://issue-tracker-dashboard.onrender.com"

  constructor(private http: HttpClient) {}
  
  getIssues(filters?: {status?: string, priority?:string}): Observable<Issue[]> {
    let params = new HttpParams()
    if (filters?.status) params = params.set("status", filters.status)
    if (filters?.priority) params = params.set("priority", filters.priority)
    
    return this.http.get<Issue[]>(this.baseUrl, {params})
  }
   
  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.baseUrl}/${id}`)
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.baseUrl, issue)
  }

  updateIssue(id: string, updates: Partial<Issue>): Observable<Issue> {
    return this.http.patch<Issue>(`${this.baseUrl}/${id}`, updates)
  }

  deleteIssue(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
  }

}

  