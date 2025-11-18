export interface Issue {
    _id?: string,
    title: string,
    description: string,
    status: "open" | "in_progress" | "resolved" | "closed",
    priority: "low" | "medium" | "high",
    assignedTo?: string,
    createdBy?: string,
    createdAt?: string,
    updatedAt?: string
}