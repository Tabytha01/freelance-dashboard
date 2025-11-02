import type { Client, Project, Payment } from "./types";

// ==============================================
// 1. COUNT PAID VS UNPAID PROJECTS
// ==============================================
export const countProjectsByPayment = (projects: Project[]) => {
  const paid = projects.filter((p) => p.paymentStatus === "paid").length;
  const unpaid = projects.filter((p) => p.paymentStatus === "unpaid").length;
  return { paid, unpaid };
};

// ==============================================
// 2. FIND CLIENT BY ID SAFELY
// ==============================================
// Returns Client or undefined (safe!)
export const findClientById = (
  clients: Client[],
  clientId: string
): Client | undefined => {
  return clients.find((c) => c.id === clientId);
};

// ==============================================
// 3. VALIDATE AND CREATE NEW PAYMENT
// ==============================================
// Returns error message if invalid, null if valid
export const validatePayment = (
  payment: Payment,
  projects: Project[]
): string | null => {
  // Check if project exists
  const project = projects.find((p) => p.id === payment.projectId);
  if (!project) {
    return "Project not found";
  }

  // Check if amount is positive
  if (payment.amount <= 0) {
    return "Amount must be greater than zero";
  }

  // Check if amount exceeds budget
  if (payment.amount > project.budget) {
    return "Payment amount exceeds project budget";
  }

  return null; // Valid!
};

// ==============================================
// 4. FILTER PROJECTS BY STATUS
// ==============================================
export const filterProjectsByStatus = (
  projects: Project[],
  status: Project["status"]
): Project[] => {
  return projects.filter((p) => p.status === status);
};

// ==============================================
// 5. FILTER PROJECTS BY PAYMENT STATUS
// ==============================================
export const filterProjectsByPayment = (
  projects: Project[],
  paymentStatus: Project["paymentStatus"]
): Project[] => {
  return projects.filter((p) => p.paymentStatus === paymentStatus);
};

// ==============================================
// 6. SEARCH CLIENTS BY NAME
// ==============================================
export const searchClients = (clients: Client[], query: string): Client[] => {
  const lowerQuery = query.toLowerCase();
  return clients.filter((c) => c.name.toLowerCase().includes(lowerQuery));
};

// ==============================================
// 7. SEARCH PROJECTS BY TITLE
// ==============================================
export const searchProjects = (
  projects: Project[],
  query: string
): Project[] => {
  const lowerQuery = query.toLowerCase();
  return projects.filter((p) => p.title.toLowerCase().includes(lowerQuery));
};

// ==============================================
// 8. CALCULATE DASHBOARD STATISTICS
// ==============================================
export const calculateStats = (
  clients: Client[],
  projects: Project[],
  payments: Payment[]
) => {
  const { paid, unpaid } = countProjectsByPayment(projects);

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const projectsByStatus = {
    pending: filterProjectsByStatus(projects, "pending").length,
    inProgress: filterProjectsByStatus(projects, "in-progress").length,
    completed: filterProjectsByStatus(projects, "completed").length,
  };

  return {
    totalClients: clients.length,
    totalProjects: projects.length,
    paidProjects: paid,
    unpaidProjects: unpaid,
    totalRevenue,
    projectsByStatus,
  };
};

// ==============================================
// 9. GET STATUS COLOR (for conditional styling)
// ==============================================
export const getStatusColor = (status: Project["status"]): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
  }
};

// ==============================================
// 10. GET PAYMENT STATUS COLOR
// ==============================================
export const getPaymentColor = (paymentStatus: Project["paymentStatus"]): string => {
  return paymentStatus === "paid"
    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
    : "bg-red-100 text-red-800 border-red-300";
};

// ==============================================
// 11. FORMAT CURRENCY
// ==============================================
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// ==============================================
// 12. FORMAT DATE
// ==============================================
export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};