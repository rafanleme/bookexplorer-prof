import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const queryClient = useQueryClient();

  const isAuthenticated = !!token;

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setAuthToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthToken(null);
    queryClient.invalidateQueries({ queryKey: ["books"] });
  };

  if (token) {
    setAuthToken(token);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
