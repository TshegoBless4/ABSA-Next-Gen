// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

// Default financial data for new users
const getDefaultUserData = () => ({
  grossMonthlyIncome: 65000,
  rent: 12000,
  vehicleFinance: 8500,
  insurance: 2500,
  medicalAid: 5500,
  subscriptions: 1000,
  emergencyFundTarget: 60000,
  emergencyFundCurrent: 45000,
  propertyDepositTarget: 180000,
  propertyDepositCurrent: 28000,
  holidayTarget: 40000,
  holidayCurrent: 12000,
  studentLoan: 120000,
  creditCardDebt: 15000,
  selectedTrack: 'firstProperty',
  trackProgress: {
    firstProperty: {
      milestone1: 'completed',
      milestone2: 'in-progress',
      milestone3: 'not-started',
      milestone4: 'not-started',
      milestone5: 'not-started',
    }
  }
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({});
  
  // Users store with their own data
  const [users, setUsers] = useState([
    { 
      email: 'user@example.com', 
      password: 'password123',
      data: getDefaultUserData()
    }
  ]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser({ email: user.email });
      setUserData(user.data);
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return false;
    }
    const newUser = { 
      email, 
      password,
      data: getDefaultUserData()
    };
    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    setCurrentUser({ email });
    setUserData(newUser.data);
    return true;
  };

  const resetPassword = (email, newPassword) => {
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], password: newPassword };
      setUsers(updatedUsers);
      return true;
    }
    return false;
  };

  const updateUserData = (updates) => {
    const updatedData = { ...userData, ...updates };
    setUserData(updatedData);
    
    // Save to users array
    const userIndex = users.findIndex(u => u.email === currentUser?.email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], data: updatedData };
      setUsers(updatedUsers);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserData({});
  };

  // Calculations based on current user's data
  const calculateNetPay = () => {
    const gross = userData.grossMonthlyIncome || 0;
    const taxRate = 0.25;
    const tax = gross * taxRate;
    const medicalTaxCredit = userData.medicalAid > 0 ? 400 : 0;
    return gross - tax + medicalTaxCredit;
  };

  const calculateFixedCosts = () => {
    return (userData.rent || 0) + (userData.vehicleFinance || 0) + 
           (userData.insurance || 0) + (userData.medicalAid || 0) + 
           (userData.subscriptions || 0);
  };

  const value = {
    isLoggedIn,
    currentUser,
    userData,
    login,
    signup,
    resetPassword,
    logout,
    updateUserData,
    netPay: calculateNetPay(),
    fixedCosts: calculateFixedCosts(),
    available: calculateNetPay() - calculateFixedCosts(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}