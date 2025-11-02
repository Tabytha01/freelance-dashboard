import type { Client } from "../types";

// ==============================================
// TYPED PROPS
// ==============================================
interface ClientCardProps {
  client: Client;
}

// ==============================================
// CLIENT CARD COMPONENT
// ==============================================
export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
      {/* Client Name */}
      <h3 className="text-xl font-bold text-purple-900 mb-3">{client.name}</h3>

      {/* Country with emoji */}
      <div className="flex items-center gap-2 text-gray-700 mb-2">

        <span className="font-medium">{client.country}</span>
      </div>

      {/* Email - Demonstrating type narrowing with optional property */}
      {client.email ? (
        <div className="flex items-center gap-2 text-gray-600">
          <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline text-sm truncate">
            {client.email}
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-400 italic text-sm">
          <span>No email provided</span>
        </div>
      )}

      {/* Client ID badge */}
      <div className="mt-3 pt-3 border-t border-purple-200">
        <span className="text-xs font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded">
          ID: {client.id}
        </span>
      </div>
    </div>
  );
};

// ==============================================
// KEY CONCEPTS DEMONSTRATED:
// ==============================================
// 1. Typed Props: ClientCardProps ensures we get a Client object
// 2. Optional Property Handling: We check if email exists before using it
// 3. Type Narrowing: TypeScript knows email is string inside the if block
// 4. Reusable Component: Can be used anywhere with any client data