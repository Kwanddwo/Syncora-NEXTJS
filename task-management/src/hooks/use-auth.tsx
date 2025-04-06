"use client";

import axios from "axios";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (storedToken && userData) {
      setToken(storedToken);
      setCurrentUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<any> => {
    const response = await axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
    });
    const token = response.data.token;
    const user = JSON.stringify(response.data.user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);

    setToken(token);
    setCurrentUser(JSON.parse(user));

    return response;
  };

  const checkEmail = async (email: string): Promise<any> => {
    const res = await axios.post("http://localhost:3001/api/auth/emailCheck", {
      email,
    });

    return res;
  };
  const register = async (
    email: string,
    name: string,
    lastName: string,
    password: string
  ): Promise<any> => {
    const res = await axios.post("http://localhost:3001/api/auth/register", {
      name,
      lastName,
      email,
      password,
    });
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
