import type { Project } from "../types";
import { useFreelance } from "../context/FreelanceContext";
import { findClientById, formatCurrency } from "../utils";

// ==============================================
// TYPED PROPS
// ==============================================
interface ProjectListProps {
  projects: Project[];
}

// ==============================================
// PROJECT LIST COMPONENT
// ==============================================
export const ProjectList = ({ projects }: ProjectListProps) => {
  const { state, dispatch } = useFreelance();

  // Handler to mark project as paid
  const handleMarkPaid = (projectId: string) => {
    dispatch({
      type: "MARK_PROJECT_PAID",
      payload: { projectId },
    });
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No projects found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => {
        // Type-safe client lookup with type narrowing
        const client = findClientById(state.clients, project.clientId);

        return (
          <div key={project.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-xl transition-all duration-300">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-1">
                  {project.title}
                </h3>
                {/* Demonstrating type narrowing - handle missing client */}
                {client ? (
                  <p className="text-brand-mid">
                    Client: <span className="font-semibold text-brand-dark">{client.name}</span>
                  </p>
                ) : (
                  <p className="text-red-500 italic">Client not found</p>
                )}
              </div>

              {/* Budget */}
              <div className="text-right">
                <p className="text-sm text-brand-mid">Budget</p>
                <p className="text-xl md:text-2xl font-bold text-brand-accent">
                  {formatCurrency(project.budget)}
                </p>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  project.status === "pending"
                    ? "bg-brand-mid/10 text-brand-mid border-2 border-brand-mid"
                    : project.status === "in-progress"
                    ? "bg-brand-accent/10 text-brand-accent border-2 border-brand-accent"
                    : "bg-brand-accent/10 text-brand-accent border-2 border-brand-accent"
                }`}
              >
                {project.status.replace("-", " ").toUpperCase()}
              </span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  project.paymentStatus === "paid"
                    ? "bg-brand-mid/10 text-brand-mid border-2 border-brand-mid"
                    : "bg-brand-accent/10 text-brand-accent border-2 border-brand-accent"
                }`}
              >
                {project.paymentStatus.toUpperCase()}
              </span>
            </div>

            {/* Action Button - Only show if unpaid */}
            {project.paymentStatus === "unpaid" && (
              <button
                onClick={() => handleMarkPaid(project.id)}
                className="w-full bg-gradient-to-r from-brand-mid to-brand-dark text-white font-bold py-2 md:py-3 px-6 rounded-lg hover:from-brand-dark hover:to-brand-mid transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Mark as Paid
              </button>
            )}

            {/* Project ID */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-xs font-mono text-brand-mid bg-brand-mid/5 px-2 py-1 rounded">
                Project ID: {project.id}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ==============================================
// KEY CONCEPTS DEMONSTRATED:
// ==============================================
// 1. Typed Props: ProjectListProps ensures we get Project[]
// 2. Context Usage: useFreelance hook to access state and dispatch
// 3. Type-Safe Actions: dispatch with discriminated union
// 4. Type Narrowing: Checking if client exists before using it
// 5. Conditional Rendering: Show button only if unpaid
// 6. Conditional Styling: Different colors based on status
// 7. Utility Functions: Using formatCurrency, getStatusColor, etc.