"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

interface AuthUser {
  uid: string;
  phoneNumber: string | null;
  name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (firebaseUser) {
          // Fetch user data from MongoDB
          try {
            const response = await fetch("/api/users/get", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firebaseUid: firebaseUser.uid }),
            });

            if (response.ok) {
              const userData = await response.json();
              setUser({
                uid: firebaseUser.uid,
                phoneNumber: firebaseUser.phoneNumber,
                name: userData.name,
              });
            } else {
              setUser({
                uid: firebaseUser.uid,
                phoneNumber: firebaseUser.phoneNumber,
              });
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            setUser({
              uid: firebaseUser.uid,
              phoneNumber: firebaseUser.phoneNumber,
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
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
