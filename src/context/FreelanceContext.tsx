import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { AppState, AppAction } from "../types";
import { initialClients, initialProjects, initialPayments } from "../data";
// ==============================================
// INITIAL STATE
// ==============================================

const initialState: AppState = {
    clients: initialClients,
    projects: initialProjects,
    payments: initialPayments,
    
};
// ==============================================
// REDUCER FUNCTION
// ==============================================
// This handles all state updates based on action types
const freelanceReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case "ADD_CLIENT":
            return {
                ...state,
                clients: [...state.clients, action.payload],
            };
            case "ADD_PROJECT":
                return {
                    ...state,
                    projects: [...state.projects, action.payload]
                };
            case "ADD_PAYMENT":
                return {
                    ...state,
                    payments: [...state.payments, action.payload]
                };
            case "MARK_PROJECT_PAID":
                return {
                    ...state,
                    projects: state.projects.map((project) =>
                        project.id === action.payload.projectId
                            ? { ...project, paymentStatus: "paid" }
                            : project )
                };
                case "UPDATE_PROJECT_STATUS":
return {
    ...state,
    projects: state.projects.map((project) =>
        project.id === action.payload.projectId
            ? { ...project, status: action.payload.status }
            : project ),
};
case "DELETE_PROJECT":
    return {
        ...state,
        projects: state.projects.filter(
            (project) => project.id !== action.payload.projectId
        ),

    };
    default:
        return state;
}
};

// ==============================================
// CONTEXT TYPE
// ==============================================

interface FreelanceContextProps {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

// ==============================================
// CREATE CONTEXT
// ==============================================
const FreelanceContext = createContext<FreelanceContextProps | undefined>(
  undefined
);



// ==============================================
// PROVIDER COMPONENT
// ==============================================
interface FreelanceProviderProps {
  children: ReactNode;
}

export const FreelanceProvider = ({ children }: FreelanceProviderProps) => {
  const [state, dispatch] = useReducer(freelanceReducer, initialState);

  return (
    <FreelanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FreelanceContext.Provider>
  );
};

// ==============================================
// CUSTOM HOOK
// ==============================================
export const useFreelance = () => {
  const context = useContext(FreelanceContext);
  if (!context) {
    throw new Error("useFreelance must be used within a FreelanceProvider");
  }
  return context;
};
