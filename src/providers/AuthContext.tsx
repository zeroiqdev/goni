"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface UserAddress {
  country?: string;
  state?: string;
  city?: string;
  streetAddress?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: UserAddress;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => Promise<AuthUser>;
  checkEmail: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<AuthUser>) => Promise<AuthUser>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapPayloadUser(raw: Record<string, unknown>): AuthUser {
  return {
    id: String(raw.id || ""),
    email: String(raw.email || ""),
    firstName: String(raw.firstName || ""),
    lastName: String(raw.lastName || ""),
    phone: raw.phone ? String(raw.phone) : undefined,
    address: raw.address && typeof raw.address === "object"
      ? {
          country: (raw.address as Record<string, unknown>).country as string | undefined,
          state: (raw.address as Record<string, unknown>).state as string | undefined,
          city: (raw.address as Record<string, unknown>).city as string | undefined,
          streetAddress: (raw.address as Record<string, unknown>).streetAddress as string | undefined,
        }
      : undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      if (data?.user) {
        setUser(mapPayloadUser(data.user));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || data.errors?.length) {
      throw new Error(data.errors?.[0]?.message || data.message || "Login failed");
    }

    const mapped = mapPayloadUser(data.user);
    setUser(mapped);
    return mapped;
  };

  const logout = async () => {
    await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const register = async (regData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthUser> => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(regData),
    });

    const data = await res.json();
    if (!res.ok || data.errors?.length) {
      throw new Error(data.errors?.[0]?.message || data.message || "Registration failed");
    }

    // Auto-login after registration
    return login(regData.email, regData.password);
  };

  const checkEmail = async (email: string): Promise<boolean> => {
    const res = await fetch("/api/auth/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.exists === true;
  };

  const updateProfile = async (updates: Partial<AuthUser>): Promise<AuthUser> => {
    if (!user) throw new Error("Not logged in");

    const body: Record<string, unknown> = {};
    if (updates.firstName !== undefined) body.firstName = updates.firstName;
    if (updates.lastName !== undefined) body.lastName = updates.lastName;
    if (updates.phone !== undefined) body.phone = updates.phone;
    if (updates.address !== undefined) body.address = updates.address;

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || data.errors?.length) {
      throw new Error(data.errors?.[0]?.message || data.message || "Update failed");
    }

    const mapped = mapPayloadUser(data.doc || data);
    setUser(mapped);
    return mapped;
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!user) throw new Error("Not logged in");

    // Payload doesn't have a dedicated change-password endpoint in REST,
    // so we PATCH the user with the password field
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: newPassword }),
    });

    const data = await res.json();
    if (!res.ok || data.errors?.length) {
      throw new Error(data.errors?.[0]?.message || data.message || "Password change failed");
    }

    // Re-login with new password to refresh the session
    await login(user.email, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        checkEmail,
        updateProfile,
        changePassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
