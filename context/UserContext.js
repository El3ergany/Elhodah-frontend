"use client";

import { endPoints } from "@/config";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(endPoints.getCurrentUser, {
        credentials: 'include',
      });

      const json = await res.json();
      if (json.successful) {
        setUser(json.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err.message);
      setUser(null);
      console.error("Fetch user error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(endPoints.logout, {
        method: 'POST',
        credentials: 'include',
      });
      const json = await res.json();
      if (json.successful) {
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    refreshUser: getUserData,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
