import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser as apiLogout } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const localData = localStorage.getItem('userInfo');
    return localData ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUserInfo(data);
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setUserInfo(data);
    return data;
  };

  const logout = async () => {
    await apiLogout();
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
