'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [user, setUserState] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setTokenState(storedToken);
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  // When token changes, fetch user profile if token exists and user is null
  useEffect(() => {
    if (!token) {
      setUserState(null);
      localStorage.removeItem('user');
      return;
    }

    // If user already loaded, no need to fetch again
    if (user) return;

    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // Token might be invalid or expired
          setTokenState(null);
          localStorage.removeItem('token');
          setUserState(null);
          localStorage.removeItem('user');
          return;
        }

        const data = await res.json();
        setUserState(data);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setUserState(null);
        localStorage.removeItem('user');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [token, user]);

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  };

  const setUser = (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        logout,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
