import { createContext, useContext, useState } from "react";
import { api, setAuthToken } from "../api/axios";
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
    try {
      const { data } = await api.post<{ token: string }>("/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setAuthToken(data.token);
    } catch {
      throw new Error("Credenciais inválidas");
    }
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
