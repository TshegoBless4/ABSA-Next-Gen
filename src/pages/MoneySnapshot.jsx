import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

function MoneySnapshot() {
  const { userData, updateUserData, netPay, fixedCosts, available } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    updateUserData(formData);
    setEditMode(false);
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  // Prepare pie chart data (only show items with value > 0)
  const pieData = [
    { name: 'Rent', value: userData.rent, color: 'white' },
    { name: 'Vehicle', value: userData.vehicleFinance, color: '#F4A261' },
    { name: 'Insurance', value: userData.insurance, color: '#00A86B' },
    { name: 'Medical Aid', value: userData.medicalAid, color: '#b60232' },
    { name: 'Subscriptions', value: userData.subscriptions, color: '#ff780f' },
  ].filter(item => item.value > 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Money Snapshot</h1>
        <button 
          onClick={() => editMode ? handleSave() : setEditMode(true)}
          className="btn-primary"
        >
          {editMode ? 'Save Changes' : 'Edit My Numbers'}
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="card" style={{ backgroundColor: '#b60232' }}>
          <h3 style={{ color: '#acacac', fontSize: '14px', marginBottom: '8px' }}>Net Monthly Pay</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{formatCurrency(netPay)}</p>
          <p style={{ fontSize: '12px', color: '#acacac' }}>After tax and medical aid credits</p>
        </div>
        <div className="card" style={{ backgroundColor: '#b60232' }}>
          <h3 style={{ color: '#acacac', fontSize: '14px', marginBottom: '8px' }}>Fixed Costs</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{formatCurrency(fixedCosts)}</p>
          <p style={{ fontSize: '12px', color: '#acacac' }}>Rent, car, insurance, etc.</p>
        </div>
        <div className="card" style={{ backgroundColor: '#b60232' }}>
          <h3 style={{ color: '#acacac', fontSize: '14px', marginBottom: '8px' }}>Available</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{formatCurrency(available)}</p>
          <p style={{ fontSize: '12px', color: '#acacac' }}>After fixed costs</p>
        </div>
      </div>

      {/* Where It Goes - Pie Chart */}
      <div className="card">
        <h2>Where It Goes</h2>
        <p style={{ fontSize: '14px', color: '#acacac', marginBottom: '16px' }}>
          Breakdown of your monthly expenses
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#939aa5' }}>
          ⓘ This shows where your fixed costs are going each month.
        </p>
      </div>

      {/* Income Waterfall Chart */}
      <div className="card">
        <h2>Income Breakdown</h2>
        <p style={{ fontSize: '14px', color: '#acacac', marginBottom: '16px' }}>
          From gross salary to take-home pay (ZAR)
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[
            { name: 'Gross Income', amount: userData.grossMonthlyIncome },
            { name: 'PAYE Tax', amount: userData.grossMonthlyIncome * 0.25 },
            { name: 'Medical Credit', amount: 400 },
            { name: 'Net Pay', amount: netPay }
          ]} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={120} />
            <Tooltip formatter={(value) => `R${value.toLocaleString()}`} />
            <Bar dataKey="amount">
              <Cell fill="white" />
              <Cell fill="#b60232" />
              <Cell fill="#00A86B" />
              <Cell fill="white" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#848c96' }}>
          ⓘ SA context: PAYE estimated at 25%. Medical tax credit: R400/month.
        </p>
      </div>

      {/* Income Section */}
      <div className="card">
        <h2>Income Details</h2>
        {editMode ? (
          <div>
            <label>Gross Monthly Income (ZAR)</label>
            <input
              type="number"
              name="grossMonthlyIncome"
              value={formData.grossMonthlyIncome}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <p><strong>Gross Monthly:</strong> {formatCurrency(userData.grossMonthlyIncome)}</p>
        )}
      </div>

      {/* Fixed Costs Section */}
      <div className="card">
        <h2>Fixed Costs Details</h2>
        {editMode ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label>Rent</label>
              <input type="number" name="rent" value={formData.rent} onChange={handleInputChange} />
            </div>
            <div>
              <label>Vehicle Finance</label>
              <input type="number" name="vehicleFinance" value={formData.vehicleFinance} onChange={handleInputChange} />
            </div>
            <div>
              <label>Insurance</label>
              <input type="number" name="insurance" value={formData.insurance} onChange={handleInputChange} />
            </div>
            <div>
              <label>Medical Aid</label>
              <input type="number" name="medicalAid" value={formData.medicalAid} onChange={handleInputChange} />
            </div>
            <div>
              <label>Subscriptions</label>
              <input type="number" name="subscriptions" value={formData.subscriptions} onChange={handleInputChange} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <p><strong>Rent:</strong> {formatCurrency(userData.rent)}</p>
            <p><strong>Vehicle Finance:</strong> {formatCurrency(userData.vehicleFinance)}</p>
            <p><strong>Insurance:</strong> {formatCurrency(userData.insurance)}</p>
            <p><strong>Medical Aid:</strong> {formatCurrency(userData.medicalAid)}</p>
            <p><strong>Subscriptions:</strong> {formatCurrency(userData.subscriptions)}</p>
          </div>
        )}
      </div>

      {/* Goals Section - UPDATED WITH PROPER HORIZONTAL PROGRESS BARS */}
      <div className="card">
        <h2>Goals Progress</h2>
        
        {/* Emergency Fund Goal */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'white' }}>Emergency Fund</span>
            <span style={{ color: '#acacac' }}>{formatCurrency(userData.emergencyFundCurrent)} / {formatCurrency(userData.emergencyFundTarget)}</span>
          </div>
          <div style={{ 
            backgroundColor: '#2d2729', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            height: '8px' 
          }}>
            <div style={{ 
              backgroundColor: '#00A86B', 
              width: `${getProgressPercentage(userData.emergencyFundCurrent, userData.emergencyFundTarget)}%`, 
              height: '100%', 
              borderRadius: '8px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          {getProgressPercentage(userData.emergencyFundCurrent, userData.emergencyFundTarget) >= 75 && (
            <p style={{ color: '#00A86B', marginTop: '8px' }}>🎉 Great progress! You're almost there!</p>
          )}
        </div>

        {/* Property Deposit Goal */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'white' }}>Property Deposit</span>
            <span style={{ color: '#acacac' }}>{formatCurrency(userData.propertyDepositCurrent)} / {formatCurrency(userData.propertyDepositTarget)}</span>
          </div>
          <div style={{ 
            backgroundColor: '#2d2729', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            height: '8px' 
          }}>
            <div style={{ 
              backgroundColor: '#ff780f', 
              width: `${getProgressPercentage(userData.propertyDepositCurrent, userData.propertyDepositTarget)}%`, 
              height: '100%', 
              borderRadius: '8px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Holiday Fund Goal */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'white' }}>Holiday Fund</span>
            <span style={{ color: '#acacac' }}>{formatCurrency(userData.holidayCurrent)} / {formatCurrency(userData.holidayTarget)}</span>
          </div>
          <div style={{ 
            backgroundColor: '#2d2729', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            height: '8px' 
          }}>
            <div style={{ 
              backgroundColor: '#b60232', 
              width: `${getProgressPercentage(userData.holidayCurrent, userData.holidayTarget)}%`, 
              height: '100%', 
              borderRadius: '8px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
      </div>

      {/* Overspending Alert Nudge */}
      {(userData.vehicleFinance / netPay) > 0.2 && (
        <div className="card" style={{ background: "linear-gradient(135deg, #16110d 0%, #2d2729 85%)", borderLeft: '4px solid #b60232' }}>
          <h3 style={{ color: 'red', marginBottom: '8px' }}>⚠️ Overspending Alert</h3>
          <p style={{ color: 'white' }}>Your vehicle costs {Math.round((userData.vehicleFinance / netPay) * 100)}% of your net income.</p>
          <p style={{ color: '#acacac' }}>Recommended: less than 20% of your income should go to car costs.</p>
          <button className="btn-primary" style={{ marginTop: '12px' }}>Explore in Studio →</button>
        </div>
      )}
    </div>
  );
}

export default MoneySnapshot;