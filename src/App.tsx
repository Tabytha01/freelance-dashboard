import { useState } from 'react';
import type { Client } from './types';
import { FreelanceProvider, useFreelance } from './context/FreelanceContext';
import { DashboardStats } from './components/DashboardStarts';
import { ClientCard } from './context/ClientCard';
import { ProjectList } from './components/ProjectList';
import { searchClients, searchProjects, filterProjectsByPayment } from './utils';

// MAIN DASHBOARD COMPONENT
const Dashboard = () => {
  const { state } = useFreelance();
  
  // Search states
  const [clientSearch, setClientSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "unpaid">("all");

  // Apply search and filters
  const filteredClients = clientSearch
    ? searchClients(state.clients, clientSearch)
    : state.clients;

  let filteredProjects = projectSearch
    ? searchProjects(state.projects, projectSearch)
    : state.projects;

  if (paymentFilter !== "all") {
    filteredProjects = filterProjectsByPayment(filteredProjects, paymentFilter);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-black mb-2">💼 Freelance Dashboard</h1>
          <p className="text-xl opacity-90">
            Manage clients, projects, and payments with TypeScript
          </p>
        </div>
      </header>
{/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Statistics */}
        <DashboardStats />
         {/* Clients Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">👥 Clients</h2>
            <input
              type="text"
              placeholder="Search clients..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client: Client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
          {filteredClients.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No clients found matching "{clientSearch}"
            </p>
          )}
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold text-gray-800"> Projects</h2>
            
            <div className="flex gap-4 flex-wrap">
              {/* Payment Filter */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as "all" | "paid" | "unpaid")}
                className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="all">All Projects</option>
                <option value="paid">Paid Only</option>
                <option value="unpaid">Unpaid Only</option>
              </select>

              {/* Search */}
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
          </div>
          
          <ProjectList projects={filteredProjects} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg">
            Built with React, TypeScript, and Tailwind CSS | &copy; 2024 Freelance Dashboard
          </p>
        </div>
      </footer>
    </div>
  );
};

// ==============================================
// APP WRAPPER (with Provider)
// ==============================================
function App() {
  return (
    <FreelanceProvider>
      <Dashboard />
    </FreelanceProvider>
  );
}

export default App;

// ==============================================
// KEY CONCEPTS DEMONSTRATED:
// ==============================================
// 1. Context Provider Wrapping: App wraps Dashboard with FreelanceProvider
// 2. useState for UI state: Search and filter states
// 3. Type-safe filtering: Using utility functions with proper types
// 4. Conditional Rendering: Show message when no results
// 5. Component Composition: Using all our components together
// 6. Responsive Design: Mobile-first Tailwind classes
