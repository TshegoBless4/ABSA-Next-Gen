// src/pages/MoneySnapshot.jsx
import React, { useContext, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AuthContext } from '../context/AuthContext';
import { FaEdit, FaSave, FaTimes, FaChartLine, FaPiggyBank, FaCar, FaHome, FaHeartbeat, FaInfoCircle, FaCheckCircle, FaPlus, FaTrash, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MoneySnapshot() {
  const { userData, updateUserData, netPay, fixedCosts, available, deleteGoal, updateGoal } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [dismissedNudges, setDismissedNudges] = useState(() => {
    const saved = localStorage.getItem('dismissedNudges');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCategoryHelp, setShowCategoryHelp] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: 0, current: 0 });

  const formatCurrency = (amount) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(amount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    updateUserData(formData);
    setEditMode(false);
  };

  const dismissNudge = (nudgeId) => {
    const newDismissed = [...dismissedNudges, nudgeId];
    setDismissedNudges(newDismissed);
    localStorage.setItem('dismissedNudges', JSON.stringify(newDismissed));
  };

  const getProgressPercentage = (current, target) => {
    if (target <= 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.target > 0) {
      const goalKey = newGoal.name.toLowerCase().replace(/\s/g, '');
      const updatedData = { 
        ...userData, 
        [`${goalKey}Target`]: newGoal.target, 
        [`${goalKey}Current`]: newGoal.current 
      };
      updateUserData(updatedData);
      setNewGoal({ name: '', target: 0, current: 0 });
    }
  };

  const editGoalValue = (goalKey, field, currentValue) => {
    const newValue = prompt(`Enter new ${field === 'target' ? 'target amount' : 'current savings'} (R):`, currentValue);
    if (newValue && !isNaN(newValue) && parseFloat(newValue) >= 0) {
      updateGoal(goalKey, field, parseFloat(newValue));
    }
  };

  const getCustomGoals = () => {
    const goals = [];
    const reserved = ['emergencyFund', 'propertyDeposit', 'holiday'];
    
    Object.keys(userData).forEach(key => {
      if (key.endsWith('Target')) {
        const baseName = key.replace('Target', '');
        if (reserved.includes(baseName)) return;
        
        const currentKey = baseName + 'Current';
        const goalName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
        
        if (userData[key] > 0 || (userData[currentKey] || 0) > 0) {
          goals.push({
            name: goalName,
            current: userData[currentKey] || 0,
            target: userData[key],
            color: '#0f65c9',
            key: baseName,
            isCustom: true,
            description: 'Your custom savings goal',
            trackLink: null,
            trackName: null
          });
        }
      }
    });
    return goals;
  };

  const defaultGoals = [
    { 
      name: 'Emergency Fund', 
      current: userData.emergencyFundCurrent, 
      target: userData.emergencyFundTarget, 
      color: '#00A86B', 
      key: 'emergencyFund', 
      isCustom: false, 
      description: '3-6 months of living expenses for unexpected events',
      trackLink: '/tracks/balanced',
      trackName: 'Balanced Track'
    },
    { 
      name: 'Property Deposit', 
      current: userData.propertyDepositCurrent, 
      target: userData.propertyDepositTarget, 
      color: '#ff780f', 
      key: 'propertyDeposit', 
      isCustom: false, 
      description: 'Save for your first home deposit',
      trackLink: '/tracks/first-property',
      trackName: 'First Property Track'
    },
    { 
      name: 'Holiday Fund', 
      current: userData.holidayCurrent, 
      target: userData.holidayTarget, 
      color: '#b60232', 
      key: 'holiday', 
      isCustom: false, 
      description: 'Save for your next vacation',
      trackLink: null,
      trackName: null
    },
  ];

  const allGoals = [...defaultGoals, ...getCustomGoals()].filter(goal => goal.target > 0 || goal.current > 0);

  const totalDebt = userData.creditCardDebt + userData.studentLoan;
  const hasDebt = totalDebt > 0;
  const annualIncome = userData.grossMonthlyIncome * 12;
  const debtToIncomeRatio = annualIncome > 0 && hasDebt ? (totalDebt / annualIncome) * 100 : 0;
  
  const housingCost = (userData.rent || 0) + (userData.bond || 0);
  const hasVehicle = (userData.vehicleFinance || 0) > 0;
  const fuelCost = hasVehicle ? 2500 : 0;
  const mobilityCost = (userData.vehicleFinance || 0) + fuelCost;
  const lifestyleCost = (userData.subscriptions || 0) + (userData.insurance || 0);
  const estimatedMonthlyDebtPayment = hasDebt ? Math.max(500, totalDebt / 36) : 0;
  const monthlySavings = userData.monthlySavings || 0;

  const pieData = [
    { name: 'Housing', value: housingCost, color: '#0f65c9' },
    ...(mobilityCost > 0 ? [{ name: 'Mobility', value: mobilityCost, color: '#F4A261' }] : []),
    ...(lifestyleCost > 0 ? [{ name: 'Lifestyle', value: lifestyleCost, color: '#00A86B' }] : []),
    ...(hasDebt && estimatedMonthlyDebtPayment > 0 ? [{ name: 'Debt', value: estimatedMonthlyDebtPayment, color: '#b60232' }] : []),
    ...(monthlySavings > 0 ? [{ name: 'Savings', value: monthlySavings, color: '#ff780f' }] : []),
  ];

  const savingsRate = netPay > 0 ? (monthlySavings / netPay) * 100 : 0;
  const lifestylePercentage = netPay > 0 ? (lifestyleCost / netPay) * 100 : 0;
  
  const getLifestyleRating = () => {
    if (lifestylePercentage > 30) return { text: 'High', color: '#b60232', suggestion: 'Consider reducing discretionary spending.' };
    if (lifestylePercentage > 20) return { text: 'Moderate', color: '#F4A261', suggestion: 'Your lifestyle spending is reasonable.' };
    if (lifestylePercentage > 0) return { text: 'Low', color: '#00A86B', suggestion: 'Great discipline with lifestyle spending!' };
    return { text: 'No Data', color: '#acacac', suggestion: 'Add lifestyle expenses to see insights.' };
  };

  const getSavingsRating = () => {
    if (!netPay || netPay <= 0) return { text: 'No Income', color: '#acacac', suggestion: 'Enter your income to see savings insights.' };
    if (savingsRate >= 20) return { text: 'Excellent', color: '#00A86B', suggestion: 'You\'re building wealth faster than most peers!' };
    if (savingsRate >= 15) return { text: 'Good', color: '#F4A261', suggestion: 'Keep up this healthy savings rate.' };
    if (savingsRate > 0) return { text: 'Needs Improvement', color: '#b60232', suggestion: 'Try to save at least 15% of your income.' };
    return { text: 'No Savings', color: '#b60232', suggestion: 'Click "Add Goal" to start saving!' };
  };

  const getDebtRating = () => {
    if (!annualIncome || annualIncome <= 0) return { text: 'No Income', color: '#acacac', suggestion: 'Enter your income to see debt insights.' };
    if (!hasDebt) return { text: 'Debt-Free', color: '#00A86B', suggestion: 'Great job! No debt to worry about.' };
    if (debtToIncomeRatio <= 20) return { text: 'Healthy', color: '#00A86B', suggestion: 'Your debt levels are well-managed.' };
    if (debtToIncomeRatio <= 40) return { text: 'Moderate', color: '#F4A261', suggestion: 'Monitor your debt closely.' };
    return { text: 'High', color: '#b60232', suggestion: 'Prioritise paying down debt before aggressive investing.' };
  };

  const lifestyleRating = getLifestyleRating();
  const savingsRating = getSavingsRating();
  const debtRating = getDebtRating();

  const getVehicleNudge = () => {
    if (!hasVehicle || !netPay) return null;
    const vehiclePercentage = (userData.vehicleFinance / netPay) * 100;
    if (vehiclePercentage > 20) return `Your vehicle costs ${Math.round(vehiclePercentage)}% of your net income. Recommended: Keep below 20%.`;
    return null;
  };

  const getSavingsNudge = () => {
    if (!netPay || netPay <= 0) return null;
    if (savingsRate === 0) return 'You are not saving anything. Click "Add Goal" to start saving!';
    if (savingsRate < 10) return `Your savings rate is ${savingsRate.toFixed(0)}%. Aim for 15-20%.`;
    return null;
  };

  const getDebtNudge = () => {
    if (!hasDebt) return null;
    if (debtToIncomeRatio > 40) return `Your debt-to-income ratio is ${debtToIncomeRatio.toFixed(0)}%. Consider accelerating debt payments.`;
    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ marginBottom: '4px' }}>Money Snapshot</h1>
          <p style={{ color: '#acacac', fontSize: '14px' }}>Your complete financial overview at a glance</p>
        </div>
        <button onClick={() => editMode ? handleSave() : setEditMode(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editMode ? <><FaSave /> Save Changes</> : <><FaEdit /> Edit My Numbers</>}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #003366 0%, #002244 100%)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#acacac', fontSize: '12px' }}>Net Monthly Pay</p><p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>{netPay > 0 ? formatCurrency(netPay) : '—'}</p><p style={{ fontSize: '10px', color: '#acacac' }}>After tax & medical credits</p></div>
            <FaChartLine size={32} color="#acacac" />
          </div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #2d2729 0%, #1a1a1a 100%)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#acacac', fontSize: '12px' }}>Fixed Costs</p><p style={{ fontSize: '28px', fontWeight: 'bold', color: '#F4A261' }}>{fixedCosts > 0 ? formatCurrency(fixedCosts) : '—'}</p><p style={{ fontSize: '10px', color: '#acacac' }}>{netPay > 0 ? `${((fixedCosts / netPay) * 100).toFixed(0)}% of income` : '—'}</p></div>
            <FaHome size={32} color="#acacac" />
          </div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #2d2729 0%, #1a1a1a 100%)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#acacac', fontSize: '12px' }}>Disposable Income</p><p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00A86B' }}>{available > 0 ? formatCurrency(available) : '—'}</p><p style={{ fontSize: '10px', color: '#acacac' }}>Available for savings & goals</p></div>
            <FaPiggyBank size={32} color="#acacac" />
          </div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #b60232 0%, #8b0020 100%)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#acacac', fontSize: '12px' }}>Debt-to-Income</p><p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>{hasDebt ? `${debtToIncomeRatio.toFixed(1)}%` : <FaCheckCircle size={24} color="#00A86B" />}</p><p style={{ fontSize: '10px', color: '#acacac' }}>{hasDebt ? 'Target: below 40%' : 'No debt - great!'}</p></div>
            <FaTimes size={32} color="#acacac" />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaHeartbeat /> Financial Health Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#2d2729', borderRadius: '12px' }}>
            <p style={{ color: '#acacac', fontSize: '12px' }}>Lifestyle Score</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: lifestyleRating.color }}>{lifestyleRating.text}</p>
            <p style={{ fontSize: '11px', color: '#acacac', marginTop: '8px' }}>{lifestyleRating.suggestion}</p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#2d2729', borderRadius: '12px' }}>
            <p style={{ color: '#acacac', fontSize: '12px' }}>Savings Score</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: savingsRating.color }}>{savingsRating.text}</p>
            <p style={{ fontSize: '11px', color: '#acacac', marginTop: '8px' }}>{savingsRating.suggestion}</p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#2d2729', borderRadius: '12px' }}>
            <p style={{ color: '#acacac', fontSize: '12px' }}>Debt Score</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: debtRating.color }}>{debtRating.text}</p>
            <p style={{ fontSize: '11px', color: '#acacac', marginTop: '8px' }}>{debtRating.suggestion}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ marginBottom: '0' }}>Where It Goes</h2>
            <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} style={{ background: 'none', border: 'none', color: '#F4A261', cursor: 'pointer' }}><FaInfoCircle size={18} /></button>
          </div>
          <p style={{ fontSize: '14px', color: '#acacac', marginBottom: '16px' }}>Category breakdown of your monthly expenses</p>
          
          {showCategoryHelp && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#acacac', marginBottom: '8px' }}><strong>How categories are calculated:</strong></p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• <span style={{ color: '#0f65c9' }}>Housing</span>: Monthly rent or bond payment</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• <span style={{ color: '#F4A261' }}>Mobility</span>: Car finance + R2500 fuel (only if you own a car)</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• <span style={{ color: '#00A86B' }}>Lifestyle</span>: Subscriptions + insurance</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• <span style={{ color: '#b60232' }}>Debt</span>: Only appears if you have debt</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• <span style={{ color: '#ff780f' }}>Savings</span>: Your monthly savings contribution</p>
            </div>
          )}
          
          {pieData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#acacac' }}>
              <p>No expense data available.</p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>Click "Edit My Numbers" to add your expenses.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={true}>
                      {pieData.map((entry, idx) => (<Cell key={`cell-${idx}`} fill={entry.color} />))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                {pieData.map(cat => (
                  <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: cat.color, borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '12px', color: '#acacac' }}>{cat.name}</span>
                    <span style={{ fontSize: '11px', color: cat.color }}>{formatCurrency(cat.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <div className="card" style={{ marginBottom: '16px' }}>
            <h2>Income Details</h2>
            {editMode ? (
              <div>
                <label>Gross Monthly Income (ZAR)</label>
                <input type="number" name="grossMonthlyIncome" value={formData.grossMonthlyIncome} onChange={handleInputChange} min="0" />
                <div style={{ marginTop: '12px' }}>
                  <label>Monthly Savings Contribution (ZAR)</label>
                  <input type="number" name="monthlySavings" value={formData.monthlySavings || 0} onChange={handleInputChange} min="0" />
                  <p style={{ fontSize: '11px', color: '#acacac', marginTop: '4px' }}>How much do you actually save each month?</p>
                </div>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '18px' }}><strong>{netPay > 0 ? formatCurrency(userData.grossMonthlyIncome) : 'Not set'}</strong> / month</p>
                {monthlySavings > 0 && <p style={{ fontSize: '14px', color: '#00A86B' }}>Monthly Savings: {formatCurrency(monthlySavings)}</p>}
              </>
            )}
            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '13px', marginBottom: '4px' }}>Tax Breakdown (SA)</p>
              <p style={{ fontSize: '12px', color: '#acacac' }}>PAYE Tax (est. 25%): {formatCurrency(userData.grossMonthlyIncome * 0.25)}</p>
              <p style={{ fontSize: '12px', color: '#acacac' }}>Medical Tax Credit: +R400</p>
              <p style={{ fontSize: '12px', color: '#00A86B', marginTop: '4px' }}>Net Take-Home: {formatCurrency(netPay)}</p>
            </div>
          </div>

          <div className="card">
            <h2>Fixed Costs Breakdown</h2>
            {editMode ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div><label>Rent/Bond</label><input type="number" name="rent" value={formData.rent} onChange={handleInputChange} min="0" /></div>
                <div><label>Vehicle Finance</label><input type="number" name="vehicleFinance" value={formData.vehicleFinance} onChange={handleInputChange} min="0" /></div>
                <div><label>Insurance</label><input type="number" name="insurance" value={formData.insurance} onChange={handleInputChange} min="0" /></div>
                <div><label>Medical Aid</label><input type="number" name="medicalAid" value={formData.medicalAid} onChange={handleInputChange} min="0" /></div>
                <div><label>Subscriptions</label><input type="number" name="subscriptions" value={formData.subscriptions} onChange={handleInputChange} min="0" /></div>
                <div><label>Credit Card Debt</label><input type="number" name="creditCardDebt" value={formData.creditCardDebt} onChange={handleInputChange} min="0" /></div>
                <div><label>Student Loan</label><input type="number" name="studentLoan" value={formData.studentLoan} onChange={handleInputChange} min="0" /></div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <p><strong>Housing:</strong> {housingCost > 0 ? formatCurrency(housingCost) : '—'}</p>
                <p><strong>Mobility:</strong> {mobilityCost > 0 ? formatCurrency(mobilityCost) : '—'}</p>
                <p><strong>Lifestyle:</strong> {lifestyleCost > 0 ? formatCurrency(lifestyleCost) : '—'}</p>
                <p><strong>Debt:</strong> {hasDebt ? formatCurrency(estimatedMonthlyDebtPayment) : <span style={{ color: '#00A86B' }}>No debt</span>}</p>
                <p><strong>Monthly Savings:</strong> {monthlySavings > 0 ? formatCurrency(monthlySavings) : '—'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Income Waterfall</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={[
            { name: 'Gross Income', amount: userData.grossMonthlyIncome },
            { name: 'PAYE Tax', amount: userData.grossMonthlyIncome * 0.25 },
            { name: 'Medical Credit', amount: 400 },
            { name: 'Net Pay', amount: netPay }
          ]} layout="vertical">
            <XAxis type="number" /><YAxis type="category" dataKey="name" width={120} /><Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="amount"><Cell fill="#F4A261" /><Cell fill="#b60232" /><Cell fill="#00A86B" /><Cell fill="#003366" /></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ marginBottom: '0' }}>Your Goals</h2>
          <button onClick={() => setShowAddGoal(!showAddGoal)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <FaPlus size={14} /> Add Goal
          </button>
        </div>

        {showAddGoal && (
          <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#2d2729', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Create New Goal</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div><label>Goal Name</label><input type="text" placeholder="e.g., Car Fund" value={newGoal.name} onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })} /></div>
              <div><label>Target Amount (R)</label><input type="number" placeholder="R50,000" value={newGoal.target || ''} onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) || 0 })} min="0" /></div>
              <div><label>Current Savings (R)</label><input type="number" placeholder="R0" value={newGoal.current || ''} onChange={(e) => setNewGoal({ ...newGoal, current: parseFloat(e.target.value) || 0 })} min="0" /></div>
              <button onClick={addGoal} className="btn-primary" style={{ padding: '10px 20px' }}>Add Goal</button>
            </div>
            <button onClick={() => setShowAddGoal(false)} className="btn-secondary" style={{ marginTop: '12px', padding: '6px 12px', fontSize: '12px' }}>Cancel</button>
          </div>
        )}

        {allGoals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#acacac' }}>
            <FaPiggyBank size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>You haven't set any goals yet.</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Click "Add Goal" to start saving for something important!</p>
          </div>
        ) : (
          allGoals.map((goal) => (
            <div key={goal.name} style={{ marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ marginBottom: '4px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {goal.name}
                    {goal.trackLink && (
                      <Link to={goal.trackLink} style={{ fontSize: '10px', color: '#F4A261', textDecoration: 'none' }}>
                        → Used in {goal.trackName}
                      </Link>
                    )}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#acacac' }}>{goal.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => editGoalValue(goal.key, 'target', goal.target)}
                    style={{ background: 'none', border: 'none', color: '#F4A261', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                  >
                    <FaPen size={12} /> Edit Target
                  </button>
                  <button 
                    onClick={() => editGoalValue(goal.key, 'current', goal.current)}
                    style={{ background: 'none', border: 'none', color: '#00A86B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                  >
                    <FaPen size={12} /> Edit Savings
                  </button>
                  {goal.isCustom && (
                    <button 
                      onClick={() => {
                        if (window.confirm(`Delete "${goal.name}" goal?`)) {
                          deleteGoal(goal.key);
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: '#b60232', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                    >
                      <FaTrash size={12} /> Delete
                    </button>
                  )}
                </div>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px' }}>Progress</span>
                  <span style={{ fontSize: '13px' }}>{formatCurrency(goal.current)} / {formatCurrency(goal.target)}</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${getProgressPercentage(goal.current, goal.target)}%`, backgroundColor: goal.color }}></div>
                </div>
              </div>
              
              {getProgressPercentage(goal.current, goal.target) >= 75 && !dismissedNudges.includes(goal.name) && (
                <div style={{ marginTop: '8px', padding: '8px', backgroundColor: `${goal.color}20`, borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>75% achieved! Keep going!</span>
                  <button onClick={() => dismissNudge(goal.name)} style={{ background: 'none', border: 'none', color: '#acacac', cursor: 'pointer' }}>✕</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="card" style={{ background: "linear-gradient(135deg, #16110d 0%, #2d2729 85%)", marginTop: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Smart Nudges</h3>
        
        {getVehicleNudge() && !dismissedNudges.includes('overspending') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '12px', backgroundColor: '#b6023220', borderRadius: '8px' }}>
            <div><p style={{ color: '#F4A261' }}>{getVehicleNudge()}</p></div>
            <button onClick={() => dismissNudge('overspending')} style={{ background: 'none', border: 'none', color: '#acacac', cursor: 'pointer' }}>✕</button>
          </div>
        )}
        
        {getSavingsNudge() && !dismissedNudges.includes('savingsTip') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '12px', backgroundColor: '#F4A26120', borderRadius: '8px' }}>
            <div><p style={{ color: '#F4A261' }}>{getSavingsNudge()}</p></div>
            <button onClick={() => dismissNudge('savingsTip')} style={{ background: 'none', border: 'none', color: '#acacac', cursor: 'pointer' }}>✕</button>
          </div>
        )}
        
        {getDebtNudge() && !dismissedNudges.includes('debtTip') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '12px', backgroundColor: '#b6023220', borderRadius: '8px' }}>
            <div><p style={{ color: '#b60232' }}>{getDebtNudge()}</p></div>
            <button onClick={() => dismissNudge('debtTip')} style={{ background: 'none', border: 'none', color: '#acacac', cursor: 'pointer' }}>✕</button>
          </div>
        )}
        
        {!getVehicleNudge() && !getSavingsNudge() && !getDebtNudge() && (
          <p style={{ color: '#acacac', padding: '12px', textAlign: 'center' }}>You're on track! No urgent issues detected.</p>
        )}
      </div>
    </div>
  );
}

export default MoneySnapshot;