// src/context/UserProvider.jsx
import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    // Income
    grossMonthlyIncome: 65000,
    bonusFrequency: 'none',
    bonusAmount: 0,

    // Fixed Costs
    rent: 12000,
    bond: 0,
    vehicleFinance: 8500,
    insurance: 2500,
    medicalAid: 5500,
    subscriptions: 1000,

    // Goals
    emergencyFundTarget: 60000,
    emergencyFundCurrent: 45000,
    propertyDepositTarget: 180000,
    propertyDepositCurrent: 28000,
    holidayTarget: 40000,
    holidayCurrent: 12000,

    // Debts
    studentLoan: 120000,
    creditCardDebt: 15000,
    personalLoan: 0,

    // Assets
    currentSavings: 50000,
    raValue: 80000,
    investments: 30000,

    // Track Progress
    selectedTrack: null,
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

  const updateUserData = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  // Calculate net monthly pay (simplified)
  const calculateNetPay = () => {
    const gross = userData.grossMonthlyIncome;
    const taxRate = 0.25;
    const tax = gross * taxRate;
    const medicalTaxCredit = userData.medicalAid > 0 ? 400 : 0;
    return gross - tax + medicalTaxCredit;
  };

  // Calculate fixed costs total
  const calculateFixedCosts = () => {
    return userData.rent + userData.bond + userData.vehicleFinance + 
           userData.insurance + userData.medicalAid + userData.subscriptions;
  };

  // Calculate available money after fixed costs
  const calculateAvailable = () => {
    return calculateNetPay() - calculateFixedCosts();
  };

  const value = {
    userData,
    updateUserData,
    netPay: calculateNetPay(),
    fixedCosts: calculateFixedCosts(),
    available: calculateAvailable(),
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};