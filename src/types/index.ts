export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  avatarInitials: string;
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "paused" | "on-hold";
  description: string;
  progress: number;
  dueDate: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: "paid" | "unpaid" | "overdue" | "draft";
  dueDate: string;
  issuedDate: string;
  description: string;
}

export interface Document {
  id: string;
  title: string;
  type: "contract" | "proposal" | "nda" | "report" | "other";
  status: "signed" | "pending" | "draft";
  createdDate: string;
  signedDate?: string;
  fileSize: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  updatedDate: string;
  category: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "pending";
  icon: string;
  product: "aegis" | "ledger" | "scribe" | "haven" | "forge";
}

export interface License {
  id: string;
  product: string;
  plan: string;
  status: "active" | "expired" | "trial";
  seats: number;
  usedSeats: number;
  expiresDate: string;
  licenseKey: string;
}

export interface BrandConfig {
  companyName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  supportEmail: string;
  domain: string;
}
