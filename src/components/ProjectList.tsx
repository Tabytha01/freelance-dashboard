import type { Project } from "../types";
import { useFreelance } from "../context/FreelanceContext";
import { findClientById, getStatusColor, getPaymentColor, formatCurrency } from "../utils";
import "../styles/ProjectList.css";

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
      <div className="project-list-empty">
        <p className="project-list-empty-text">No projects found</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => {
        // Type-safe client lookup with type narrowing
        const client = findClientById(state.clients, project.clientId);

        return (
          <div key={project.id} className="project-card">
            {/* Project Header */}
            <div className="project-header">
              <div>
                <h3 className="project-title">{project.title}</h3>
                {/* Demonstrating type narrowing - handle missing client */}
                {client ? (
                  <p className="project-client">
                    👤 Client: <span>{client.name}</span>
                  </p>
                ) : (
                  <p className="project-client-error">Client not found</p>
                )}
              </div>

              {/* Budget */}
              <div className="project-budget">
                <p className="project-budget-label">Budget</p>
                <p className="project-budget-amount">
                  {formatCurrency(project.budget)}
                </p>
              </div>
            </div>

            {/* Status Badges */}
            <div className="project-badges">
              <span className={`status-badge ${getStatusColor(project.status)}`}>
                📊 {project.status.replace("-", " ").toUpperCase()}
              </span>
              <span className={`status-badge ${getPaymentColor(project.paymentStatus)}`}>
                {project.paymentStatus.toUpperCase()}
              </span>
            </div>

            {/* Action Button - Only show if unpaid */}
            {project.paymentStatus === "unpaid" && (
              <button
                onClick={() => handleMarkPaid(project.id)}
                className="mark-paid-button"
              >
                Mark as Paid
              </button>
            )}

            {/* Project ID */}
            <div className="project-footer">
              <span className="project-id">
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