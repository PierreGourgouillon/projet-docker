import React, { createContext, useState, useEffect } from 'react';
import { isAccessTokenExpired } from '../api/refreshToken';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('JWT');
    if (token && !isAccessTokenExpired(token)) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken) => {
    localStorage.setItem('JWT', accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('REFRESH_TOKEN');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
