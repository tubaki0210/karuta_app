"use client";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLogout: boolean;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, SetUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogout, setIsLogout] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
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
    setIsLogout(true);
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Context-Type": "application/json" },
    });
    if (res.ok) {
      SetUser(null);
      router.replace("/");
    }
    setTimeout(() => {
      setIsLogout(false);
    }, 100);
  };

  useEffect(() => {
    // 認証状態の変化を監視するリスナーを設定
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      SetUser(session?.user ?? null);
      setIsLoading(false);
    });
    // クリーンアップ関数
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isLogout,
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
