export interface User {
    _id: string;
    email: string;
    fullName: string;
    createdAt: Date;
    isEmailVerified: boolean;
    updatedAt: Date;
    profilePicture?: string;
}

export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: User | string;
    color: string;
    members: {
        user: User;
        role: "admin" | "member" | "owner" | "viewer";
        joinedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export enum ProjectStatus {
    PLANNING = "Planning",
    IN_PROGRESS = "In Progress",
    ON_HOLD = "On Hold",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}

export interface Project {
    _id: string;
    title: string;
    description?: string;
    status: ProjectStatus;
    workspace: Workspace;
    startDate: string,
    dueDate: string,
    progress: number,
    members: {
        user: User,
        role: "admin" | "viewer" | "member" | "owner"
    }[];
    tasks: Task[]
    createdAt: Date;
    updatedAt: Date;
}

export type TasksPriority = "Low" | "Medium" | "High";
export type TaskStatus = "To Do" | "In Progress" | "Done";
export enum ProjectMemberRole {
    MANAGER = "manager",
    CONTRIBUTOR = "contributor",
    VIEWER = "viewer",
}

export interface Subtask {
    _id: string;
    title: string;
    completed: string;
    createdAt: string;
}

export interface Attachment{
    _id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: string;
    uplaodedBy: string;
    uploadedAt: Date;
}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    project: Project; 
    createdAt: Date;
    updatedAt: Date;
    isArchived: boolean;
    dueDate: string,
    priority: TasksPriority;
    assignee: User | string;
    createdBy: User | string;
    assignees: User[];
    subtasks?: Subtask[];
    watchers?: User[];
    attachments?: Attachment[];
}

export interface MembersProps {
    _id: string;
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
    joinedAt: Date;
}