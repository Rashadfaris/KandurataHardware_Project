// authContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/user/login', { username, password });
      if (response.data.success) {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ username, role }));
        setUser({ username, role });
        return { username, role };
      } else {
        console.error('Login failed:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
