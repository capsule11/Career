'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  progressPercentage?: number;
  assessmentCompleted?: boolean;
  profileCompleted?: boolean;
  recommendationsGenerated?: boolean;
  skillResults?: any[];
  personalProfile?: any;
  careerRecommendations?: any[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  saveAssessmentResults: (skillResults: any[], answers?: any[], sessionId?: string) => Promise<{
    success: boolean;
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // After successful registration, auto-login
        const loginResult = await login(email, password);
        return loginResult;
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const refreshUser = async () => {
    await checkAuthState();
  };

  const saveAssessmentResults = async (skillResults: any[], answers?: any[], sessionId?: string) => {
    try {
      const response = await fetch('/api/user/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          skillResults,
          answers,
          sessionId,
          totalTimeSpent: answers?.reduce((total, answer) => total + answer.timeSpent, 0) || 0
        }),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser({
          skillResults: data.skillResults,
          assessmentCompleted: true,
          progressPercentage: data.progressPercentage
        });
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false };
      }
    } catch (error) {
      console.error('Save assessment error:', error);
      throw error
    }
  };

  const savePersonalProfile = async (personalProfile: any) => {
    try {
      const response = await fetch('/api/user/personal-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(personalProfile),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser({
          personalProfile: data.personalProfile,
          profileCompleted: true,
          progressPercentage: data.progressPercentage
        });
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Save personal profile error:', error);
      return { success: false, error: 'Failed to save personal profile' };
    }
  };

  const saveRecommendations = async (recommendations: any[]) => {
    try {
      const response = await fetch('/api/user/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ recommendations }),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser({
          careerRecommendations: data.careerRecommendations,
          recommendationsGenerated: true,
          progressPercentage: data.progressPercentage
        });
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Save recommendations error:', error);
      return { success: false, error: 'Failed to save recommendations' };
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    saveAssessmentResults
  };

  // Add the save functions to the context
  (contextValue as any).saveAssessmentResults = saveAssessmentResults;
  (contextValue as any).savePersonalProfile = savePersonalProfile;
  (contextValue as any).saveRecommendations = saveRecommendations;

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};