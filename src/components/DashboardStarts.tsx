import { useFreelance } from "../context/FreelanceContext";
import { calculateStats, formatCurrency } from "../utils";

// ==============================================
// DASHBOARD STATS COMPONENT
// ==============================================
// No props needed - gets data from context
export const DashboardStats = () => {
  const { state } = useFreelance();
  const stats = calculateStats(state.clients, state.projects, state.payments);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Clients */}
      <StatCard
        title="Total Clients"
        value={stats.totalClients}
        icon=""
        gradient="from-brand-accent to-brand-accent"
      />

      {/* Total Projects */}
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        icon=""
        gradient="from-brand-accent to-brand-accent"
      />

      {/* Paid Projects */}
      <StatCard
        title="Paid Projects"
        value={stats.paidProjects}
        icon=""
        gradient="from-brand-accent to-brand-accent"
      />

      {/* Unpaid Projects */}
      <StatCard
        title="Unpaid Projects"
        value={stats.unpaidProjects}
    icon=""
        gradient="from-brand-accent to-brand-accent"
      />

      {/* Total Revenue - Spanning full width */}
      <div className="lg:col-span-4">
  <div className="bg-brand-accent rounded-2xl p-6 md:p-8 text-black shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-lg font-medium opacity-90 mb-2">
                Total Revenue
              </p>
              <p className="text-4xl md:text-5xl font-black">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm opacity-90 mb-2">Project Status</p>
              <div className="space-y-1 text-sm">
                <div>
                  Pending: <span className="font-bold">{stats.projectsByStatus.pending}</span>
                </div>
                <div>
                  In Progress: <span className="font-bold">{stats.projectsByStatus.inProgress}</span>
                </div>
                <div>
                  Completed: <span className="font-bold">{stats.projectsByStatus.completed}</span>
                </div>
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
  gradient: string;
}

const StatCard = ({ title, value, icon, gradient }: StatCardProps) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-4xl">{icon}</span>
        <span className="text-4xl md:text-5xl font-black">{value}</span>
      </div>
      <p className="text-lg font-semibold opacity-90">{title}</p>
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