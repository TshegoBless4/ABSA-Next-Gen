// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const getDefaultUserData = () => ({
  grossMonthlyIncome: 0,
  bonusFrequency: 'none',
  bonusAmount: 0,
  rent: 0,
  bond: 0,
  vehicleFinance: 0,
  insurance: 0,
  medicalAid: 0,
  subscriptions: 0,
  monthlySavings: 0,
  monthlyDebtPayment: 0,  // User's actual monthly debt payment
  emergencyFundTarget: 0,
  emergencyFundCurrent: 0,
  propertyDepositTarget: 0,
  propertyDepositCurrent: 0,
  holidayTarget: 0,
  holidayCurrent: 0,
  currentSavings: 0,
  raValue: 0,
  investments: 0,
  selectedTrack: 'firstProperty',
  trackProgress: {
    firstProperty: {
      milestone1: 'not-started',
      milestone2: 'not-started',
      milestone3: 'not-started',
      milestone4: 'not-started',
      milestone5: 'not-started',
    },
    balanced: {
      milestone1: 'not-started',
      milestone2: 'not-started',
      milestone3: 'not-started',
      milestone4: 'not-started',
      milestone5: 'not-started',
    },
    aggressive: {
      milestone1: 'not-started',
      milestone2: 'not-started',
      milestone3: 'not-started',
      milestone4: 'not-started',
      milestone5: 'not-started',
    }
  }
});

const loadUsers = () => {
  const storedUsers = localStorage.getItem('app_users');
  if (storedUsers) return JSON.parse(storedUsers);
  return [{ email: 'user@example.com', password: 'password123', data: getDefaultUserData() }];
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('currentUser') !== null);
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const usersList = loadUsers();
      const foundUser = usersList.find(u => u.email === user.email);
      if (foundUser?.data) return foundUser.data;
    }
    return getDefaultUserData();
  });

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser({ email: user.email });
      setUserData(user.data);
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    if (users.find(u => u.email === email)) return false;
    const newUser = { email, password, data: getDefaultUserData() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setIsLoggedIn(true);
    setCurrentUser({ email });
    setUserData(newUser.data);
    localStorage.setItem('currentUser', JSON.stringify({ email }));
    localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    return true;
  };

  const resetPassword = (email, newPassword) => {
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], password: newPassword };
      setUsers(updatedUsers);
      localStorage.setItem('app_users', JSON.stringify(updatedUsers));
      return true;
    }
    return false;
  };

  const checkEmailExists = (email) => users.findIndex(u => u.email === email) !== -1;

  const updateUserData = (updates) => {
    const updatedData = { ...userData, ...updates };
    setUserData(updatedData);
    const userIndex = users.findIndex(u => u.email === currentUser?.email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], data: updatedData };
      setUsers(updatedUsers);
      localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    }
  };

  // DELETE a custom goal
  const deleteGoal = (goalKey) => {
    const updatedData = { ...userData };
    delete updatedData[`${goalKey}Target`];
    delete updatedData[`${goalKey}Current`];
    setUserData(updatedData);
    
    const userIndex = users.findIndex(u => u.email === currentUser?.email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], data: updatedData };
      setUsers(updatedUsers);
      localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    }
  };

  // UPDATE a goal's target or current amount
  const updateGoal = (goalKey, field, value) => {
    const updatedData = { 
      ...userData, 
      [`${goalKey}${field === 'target' ? 'Target' : 'Current'}`]: value 
    };
    setUserData(updatedData);
    
    const userIndex = users.findIndex(u => u.email === currentUser?.email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], data: updatedData };
      setUsers(updatedUsers);
      localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    }
  };

  // Track progress - cycles: not-started → in-progress → completed → not-started
  const updateTrackProgress = (trackName, milestone, status) => {
    let newStatus;
    if (status === "not-started") {
      newStatus = "in-progress";
    } else if (status === "in-progress") {
      newStatus = "completed";
    } else {
      newStatus = "not-started";
    }
    
    const updatedData = {
      ...userData,
      trackProgress: {
        ...userData.trackProgress,
        [trackName]: { ...userData.trackProgress[trackName], [milestone]: newStatus }
      }
    };
    setUserData(updatedData);
    const userIndex = users.findIndex(u => u.email === currentUser?.email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], data: updatedData };
      setUsers(updatedUsers);
      localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserData(getDefaultUserData());
    localStorage.removeItem('currentUser');
  };

  const calculateNetPay = () => {
    const gross = userData.grossMonthlyIncome || 0;
    const tax = gross * 0.25;
    const medicalTaxCredit = userData.medicalAid > 0 ? 400 : 0;
    return gross - tax + medicalTaxCredit;
  };

  const calculateFixedCosts = () => {
    return (userData.rent || 0) + (userData.vehicleFinance || 0) + 
           (userData.insurance || 0) + (userData.medicalAid || 0) + 
           (userData.subscriptions || 0) + (userData.monthlyDebtPayment || 0);
  };

  const value = {
    isLoggedIn,
    currentUser,
    userData,
    login,
    signup,
    resetPassword,
    logout,
    checkEmailExists,
    updateUserData,
    updateTrackProgress,
    deleteGoal,
    updateGoal,
    netPay: calculateNetPay(),
    fixedCosts: calculateFixedCosts(),
    available: calculateNetPay() - calculateFixedCosts(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}