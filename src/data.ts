import type { Client, Project, Payment } from "./types";

// ==============================================
// SAMPLE CLIENTS (Minimum 2 required)
// ==============================================
export const initialClients: Client[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    country: "United States",
    email: "sarah.j@techcorp.com",
  },
  {
    id: "c2",
    name: "Michael Chen",
    country: "Canada",
    // No email - demonstrating optional property
  },
  {
    id: "c3",
    name: "Amara Okafor",
    country: "Nigeria",
    email: "amara@designstudio.ng",
  },
];

// ==============================================
// SAMPLE PROJECTS (Minimum 2 required)
// ==============================================
export const initialProjects: Project[] = [
  {
    id: "p1",
    clientId: "c1",
    title: "E-commerce Website Redesign",
    budget: 15000,
    status: "in-progress",
    paymentStatus: "unpaid",
  },
  {
    id: "p2",
    clientId: "c2",
    title: "Mobile App Development",
    budget: 25000,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "p3",
    clientId: "c1",
    title: "SEO Optimization Campaign",
    budget: 5000,
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "p4",
    clientId: "c3",
    title: "Brand Identity Package",
    budget: 8000,
    status: "completed",
    paymentStatus: "unpaid",
  },
];

// ==============================================
// SAMPLE PAYMENTS (Minimum 1 required)
// ==============================================
export const initialPayments: Payment[] = [
  {
    projectId: "p2",
    amount: 25000,
    date: "2025-01-15",
  },
  {
    projectId: "p1",
    amount: 7500, // Partial payment
    date: "2025-02-01",
  },
];