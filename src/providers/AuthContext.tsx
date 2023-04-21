import { createContext, useState } from "react";
import { User } from "../models/User";

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  isConnected: false,
  setIsConnected: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isConnected, setIsConnected }}
    >
      {children}
    </AuthContext.Provider>
  );
};
