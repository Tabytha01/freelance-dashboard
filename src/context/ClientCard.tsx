import type { Client } from "../types";
import "../styles/ClientCard.css";

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
    <div className="client-card">
      {/* Client Name */}
      <h3 className="client-name">{client.name}</h3>

      {/* Country with emoji */}
      <div className="client-info">
        <span className="client-info-label">Country</span>
        <span className="client-info-value">{client.country}</span>
      </div>

      {/* Email - Demonstrating type narrowing with optional property */}
      {client.email ? (
        <div className="client-email">
          <span className="client-info-label">Email</span>
          <a href={`mailto:${client.email}`} className="client-email-link">
            {client.email}
          </a>
        </div>
      ) : (
        <div className="client-email-missing">
          <span>No email provided</span>
        </div>
      )}

      {/* Client ID badge */}
      <div className="client-footer">
        <span className="client-id">ID: {client.id}</span>
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