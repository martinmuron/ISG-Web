export const ADMIN_CREDENTIALS = {
  email: "nick@investmentsolutions.cz",
  password: "celticssuck",
};

export const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export function setSession(email: string) {
  const session = {
    email,
    timestamp: Date.now(),
  };
  localStorage.setItem("admin_session", JSON.stringify(session));
}

export function getSession() {
  if (typeof window === "undefined") return null;
  
  const session = localStorage.getItem("admin_session");
  if (!session) return null;

  try {
    const parsed = JSON.parse(session);
    const now = Date.now();
    
    // Check if session is expired
    if (now - parsed.timestamp > SESSION_DURATION) {
      clearSession();
      return null;
    }
    
    return parsed;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_session");
  }
}

export function isAuthenticated() {
  return getSession() !== null;
}