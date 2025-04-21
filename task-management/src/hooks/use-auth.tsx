"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {checkEmailAPI, loginAPI, registerAPI} from "@/app/_api/AuthAPIs";

interface User {
  // Define the user data structure here
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (
    email: string,
    name: string,
    lastName: string,
    password: string
  ) => Promise<any>;
  checkEmail: (email: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log("🔁 AuthProvider mounted");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    try {
      if (storedToken && userData) {
        setToken(storedToken);
        setCurrentUser(JSON.parse(userData));
      } else {
        // If only one exists, clean both to prevent partial auth state
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Corrupted auth data:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<any> => {
    const response = await loginAPI(email,password);
    const token = response.data.token;
    const user = JSON.stringify(response.data.user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);

    setToken(token);
    setCurrentUser(JSON.parse(user));

    return response;
  };

  const checkEmail = async (email: string): Promise<any> => {
    const res = await checkEmailAPI(email);

    return res;
  };
  const register = async (
    email: string,
    name: string,
    lastName: string,
    password: string
  ): Promise<any> => {
    const res = await registerAPI(email,name,lastName,password);
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setCurrentUser(res.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    checkEmail,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
