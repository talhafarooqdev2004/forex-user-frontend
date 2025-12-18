'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { axiosInstance } from '@/lib/config';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchingRef = useRef(false);

  useEffect(() => {
    // Check for token in localStorage on mount
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      fetchUserWithToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserWithToken = async (authToken: string) => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current) {
      console.log('Already fetching user, skipping...');
      return;
    }

    fetchingRef.current = true;
    
    try {
      console.log('Fetching user with token:', authToken.substring(0, 20) + '...');
      
      const response = await axiosInstance.get('/users/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      console.log('User response:', response.data);
      
      if (response.data.success && response.data.data) {
        const userData = response.data.data;
        console.log('Setting user data:', userData);
        setUser(userData);
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response structure');
      }
    } catch (error: any) {
      console.error('Failed to fetch user:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // If token is invalid, clear it
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      throw error; // Re-throw to let caller handle it
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  };

  const fetchUser = async () => {
    if (!token) return;
    await fetchUserWithToken(token);
  };

  const login = async (authToken: string) => {
    console.log('Login called with token:', authToken.substring(0, 20) + '...');
    
    try {
      localStorage.setItem('authToken', authToken);
      setToken(authToken);
      await fetchUserWithToken(authToken);
      console.log('Login successful, user set');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    fetchingRef.current = false;
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

