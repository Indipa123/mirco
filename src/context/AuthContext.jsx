import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem("micromart-user") || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const login = ({ email, role, name }) => {
    const nextUser = {
      name: name || (role === "vendor" ? "Vendor Account" : "Indika Buyer"),
      email,
      role,
      avatar: "M",
    };
    setUser(nextUser);
    localStorage.setItem("micromart-user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("micromart-user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
