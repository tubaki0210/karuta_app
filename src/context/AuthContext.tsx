"use client";
import { UserFront } from "@/type/types";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserFront | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, SetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      SetUser(data.user);
    }
    return res;
  };

  const logout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      console.log("ログアウト成功");
      SetUser(null);
    }
  };

  useEffect(() => {
    const AuthUser = async () => {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        SetUser(data.user);
      } else {
        SetUser(null);
      }
      setIsLoading(false);
    };
    AuthUser();
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
