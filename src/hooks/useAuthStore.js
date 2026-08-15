import { useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'blue_carbon_user_session';

export function useAuthStore() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (email, password) => {
    // Academic demo authentication state
    const userName = email.split('@')[0].replace('.', ' ');
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    const newUser = {
      name: formattedName || 'Environmental Researcher',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      role: 'Academic Researcher',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const register = (name, email, password, avatarUrl) => {
    const newUser = {
      name: name || 'Eco Guardian User',
      email: email,
      avatar: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      role: 'Student / Researcher',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };
}
