import { useFreelance } from "../context/FreelanceContext";
import { calculateStats, formatCurrency } from "../utils";
import "../styles/DashboardStats.css";

// ==============================================
// DASHBOARD STATS COMPONENT
// ==============================================
// No props needed - gets data from context
export const DashboardStats = () => {
  const { state } = useFreelance();
  const stats = calculateStats(state.clients, state.projects, state.payments);

  return (
    <div className="stats-grid">
      {/* Total Clients */}
      <StatCard
        title="Total Clients"
        value={stats.totalClients}
        icon=" Clients"
        colorClass="stat-card-blue"
      />

      {/* Total Projects */}
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        icon=" Projects"
        colorClass="stat-card-purple"
      />

      {/* Paid Projects */}
      <StatCard
        title="Paid Projects"
        value={stats.paidProjects}
        icon="Payed projects"
        colorClass="stat-card-green"
      />

      {/* Unpaid Projects */}
      <StatCard
        title="Unpaid Projects"
        value={stats.unpaidProjects}
        icon="Un paid projects"
        colorClass="stat-card-orange"
      />

      {/* Total Revenue - Spanning full width */}
      <div className="revenue-card">
        <div className="revenue-content">
          <div>
            <p className="revenue-title">Total Revenue</p>
            <p className="revenue-amount">{formatCurrency(stats.totalRevenue)}</p>
          </div>
          <div className="revenue-stats">
            <p className="revenue-stats-title">Project Status</p>
            <div className="revenue-stats-list">
              <div>
                Pending: <span className="revenue-stats-item">{stats.projectsByStatus.pending}</span>
              </div>
              <div>
                In Progress: <span className="revenue-stats-item">{stats.projectsByStatus.inProgress}</span>
              </div>
              <div>
                Completed: <span className="revenue-stats-item">{stats.projectsByStatus.completed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================
// REUSABLE STAT CARD COMPONENT
// ==============================================
// Demonstrating generic-like reusable component
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  colorClass: string;
}

const StatCard = ({ title, value, icon, colorClass }: StatCardProps) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-value">{value}</span>
      </div>
      <p className="stat-title">{title}</p>
    </div>
  );
};

// ==============================================
// KEY CONCEPTS DEMONSTRATED:
// ==============================================
// 1. Context Usage: Getting state from useFreelance hook
// 2. Utility Functions: Using calculateStats and formatCurrency
// 3. Reusable Components: StatCard can be used with any data
// 4. Typed Props: StatCardProps ensures correct data
// 5. Conditional Styling: Different gradients for each stat
// 6. Grid Layout: Responsive grid with Tailwind