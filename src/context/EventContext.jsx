
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create shared context
const EventContext = createContext(null);

// Provider component
export function EventProvider({ children }) {
  const [registered, setRegistered] = useState([]);

  // Register or unregister an event
  const handleRegister = (id) => {
    setRegistered((previous) =>
      previous.includes(id)
        ? previous.filter((eventId) => eventId !== id)
        : [...previous, id]
    );
  };

  // Side effect: update browser title
  useEffect(() => {
    document.title =
      `EventSphere | ${registered.length} Registered`;
  }, [registered]);

  return (
    <EventContext.Provider
      value={{ registered, handleRegister }}
    >
      {children}
    </EventContext.Provider>
  );
}

// Custom hook for accessing shared state
export function useEvents() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvents must be used inside EventProvider"
    );
  }

  return context;
}
