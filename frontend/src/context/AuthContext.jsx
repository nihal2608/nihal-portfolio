import React, { createContext, useContext, useState } from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext(null);

function loadUser() {
  try {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login({ email, password }) {
    setLoading(true);
    setError("");
    try {
      const res = await authApi.login({ email, password });
      // res: { token, type, fullName, email, role, modules }
      const nextUser = {
        fullName: res.fullName,
        email: res.email,
        role: res.role,
        modules: res.modules || [],
      };
      localStorage.setItem("auth_token", res.token);
      localStorage.setItem("auth_user", JSON.stringify(nextUser));
      setToken(res.token);
      setUser(nextUser);
      return nextUser;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function register({ fullName, email, password }) {
    setLoading(true);
    setError("");
    try {
      const message = await authApi.register({ fullName, email, password });
      return message;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  }

  function updateStoredUser(updates) {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("auth_user", JSON.stringify(next));
      return next;
    });
  }

  function hasModule(moduleName) {
    if (user?.role === "SUPER_ADMIN") return true;
    return Boolean(user?.modules?.includes(moduleName));
  }

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
    isSuperAdmin: user?.role === "SUPER_ADMIN",
    hasModule,
    loading,
    error,
    login,
    register,
    logout,
    updateStoredUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
