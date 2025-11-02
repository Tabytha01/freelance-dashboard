// ==============================================
// CLIENT INTERFACE
// ==============================================
export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string; // Optional - client might not have email
}

// ==============================================
// PROJECT INTERFACE
// ==============================================
export interface Project {
  id: string;
  clientId: string; // References a Client
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed"; // Only these 3 values allowed
  paymentStatus: "paid" | "unpaid";
}

// ==============================================
// PAYMENT INTERFACE
// ==============================================
export interface Payment {
  projectId: string; // References a Project
  amount: number;
  date: string; // ISO format (YYYY-MM-DD)
}

// ==============================================
// APP STATE
// ==============================================
export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// ==============================================
// REDUCER ACTIONS (Discriminated Unions)
// ==============================================
// The "type" field is the discriminant - TypeScript uses it
// to know what payload shape to expect
export type AppAction =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string } }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: Project["status"] } }
  | { type: "DELETE_PROJECT"; payload: { projectId: string } };