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
    <div className="bg-gradient-to-br from-brand-mid to-brand-dark border-2 border-brand-mid rounded-xl p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
      {/* Client Name */}
      <h3 className="text-xl font-bold text-brand-accent mb-3">{client.name}</h3>

      {/* Country */}
      <div className="flex items-center gap-2 text-brand-accent mb-2">
        <span className="font-medium">{client.country}</span>
      </div>

      {/* Email - Demonstrating type narrowing with optional property */}
      {client.email ? (
        <div className="flex items-center gap-2 text-brand-mid">
          <a href={`mailto:${client.email}`} className="text-brand-accent hover:underline text-sm truncate">
            {client.email}
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-brand-mid/70 italic text-sm">
          <span>No email provided</span>
        </div>
      )}

      {/* Client ID badge */}
      <div className="mt-3 pt-3 border-t border-brand-mid/30">
        <span className="text-xs font-mono text-brand-mid bg-brand-mid/5 px-2 py-1 rounded">
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