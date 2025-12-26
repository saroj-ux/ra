import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, City } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  login: (email: string, password: string, role: "customer" | "provider") => Promise<void>;
  signup: (name: string, email: string, password: string, role: "customer" | "provider") => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>("Delhi");

  // Mock login - in production, this would call an API
  // TODO: Replace with real authentication (Supabase/Firebase)
  const login = async (email: string, password: string, role: "customer" | "provider") => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user data
    setUser({
      id: "user-1",
      name: role === "customer" ? "Rahul Sharma" : "Rajesh Kumar",
      email,
      phone: "+91 98765 43210",
      role,
    });
  };

  const signup = async (name: string, email: string, password: string, role: "customer" | "provider") => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({
      id: "user-" + Date.now(),
      name,
      email,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        selectedCity,
        setSelectedCity,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
