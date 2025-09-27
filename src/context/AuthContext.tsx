"use client";
import { supabase } from "@/lib/supabase";
import { UserFront } from "@/type/types";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, SetUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Context-Type": "application/json" },
    });
    if (res.ok) {
      // ログアウト成功後、ログインページなどにリダイレクト
      SetUser(null);
      router.push("/");
    }
    // const res = await fetch("/api/logout", { method: "POST" });
    // if (res.ok) {
    //   console.log("ログアウト成功");
    //   SetUser(null);
    // }
  };

  useEffect(() => {
    // 認証状態の変化を監視するリスナーを設定
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      SetUser(session?.user ?? null);
      // if (session) {
      //   // セッションが存在する場合
      //   SetUser(session.user);
      // } else {
      //   // セッションが存在しない場合（ログアウトなど）
      //   SetUser(null);
      // }
      setIsLoading(false);
    });

    // // 初期セッションの取得
    // const getInitialSession = async () => {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();
    //   // getSessionはUIの切り替え表示などの安全性が低くても問題のない場合
    //   // getUserはデータベースの更新や認証など安全性が高い必要があるとき
    //   if (session) {
    //     SetUser(session.user);
    //   } else {
    //     SetUser(null);
    //   }
    //   setIsLoading(false);
    // };

    // getInitialSession();

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
