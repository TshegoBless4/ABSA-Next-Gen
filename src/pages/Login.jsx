// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const { login, signup, resetPassword, users } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must contain @';
    } else if (!email.includes('.')) {
      newErrors.email = 'Email must contain a domain (e.g., .com)';
    }

    if (!isForgotPassword) {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 3) {
        newErrors.password = 'Password must be at least 3 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isSignUp) {
      const success = signup(email, password);
      if (success) {
        navigate('/');
      } else {
        setErrors({ general: 'User already exists. Please login or reset password.' });
      }
    } else {
      const success = login(email, password);
      if (success) {
        navigate('/');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    }
  };

  const handleSendResetLink = () => {
    if (!email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }
    
    // Check if user exists
    const userExists = users?.find(u => u.email === email);
    
    if (userExists) {
      // Simulate sending email
      setResetMessage(` A password reset link has been sent to ${email}. 
                       For demo purposes, you can reset your password below.`);
      setShowResetForm(true);
      setErrors({});
    } else {
      setErrors({ general: 'Email not found. Please sign up first.' });
    }
  };

  const handleSetNewPassword = () => {
    if (!newPassword) {
      setErrors({ newPassword: 'Please enter a new password' });
      return;
    }
    if (newPassword.length < 3) {
      setErrors({ newPassword: 'Password must be at least 3 characters' });
      return;
    }
    
    const success = resetPassword(email, newPassword);
    if (success) {
      setResetMessage('✅ Password reset successful! You can now login with your new password.');
      setTimeout(() => {
        setIsForgotPassword(false);
        setShowResetForm(false);
        setResetMessage('');
        setNewPassword('');
      }, 3000);
    }
  };

  const backToLogin = () => {
    setIsForgotPassword(false);
    setIsSignUp(false);
    setShowResetForm(false);
    setErrors({});
    setResetMessage('');
    setEmail('');
    setPassword('');
    setNewPassword('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#b60232'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        width: '400px' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#b60232' }}>
          {isForgotPassword ? 'Reset Password' : (isSignUp ? 'Sign Up' : 'Login')}
        </h2>
        
        {/* Email Field */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: errors.email ? '1px solid red' : '1px solid #ccc'
            }}
            disabled={showResetForm}
          />
          {errors.email && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {errors.email}
            </div>
          )}
        </div>
        
        {/* Password Field - Not shown in forgot password mode */}
        {!isForgotPassword && !showResetForm && (
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '8px', 
                border: errors.password ? '1px solid red' : '1px solid #ccc'
              }}
            />
            {errors.password && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.password}
              </div>
            )}
          </div>
        )}

        {/* New Password Field - For reset password */}
        {showResetForm && (
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
              }}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '8px', 
                border: errors.newPassword ? '1px solid red' : '1px solid #ccc'
              }}
            />
            {errors.newPassword && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.newPassword}
              </div>
            )}
          </div>
        )}

        {/* Reset Message */}
        {resetMessage && (
          <div style={{ 
            color: showResetForm ? '#b60232' : 'green', 
            fontSize: '12px', 
            marginBottom: '16px', 
            textAlign: 'center',
            padding: '8px',
            backgroundColor: showResetForm ? '#fff3e0' : '#e8f5e9',
            borderRadius: '8px',
            whiteSpace: 'pre-line'
          }}>
            {resetMessage}
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div style={{ 
            color: 'red', 
            fontSize: '12px', 
            marginBottom: '16px', 
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#ffebee',
            borderRadius: '8px'
          }}>
            {errors.general}
          </div>
        )}
        
        {/* Submit Button */}
        {!isForgotPassword && !showResetForm && (
          <button 
            type="submit" 
            onClick={handleSubmit}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#b60232', 
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        )}

        {/* Send Reset Link Button */}
        {isForgotPassword && !showResetForm && (
          <button 
            onClick={handleSendResetLink}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#b60232', 
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Send Reset Link
          </button>
        )}

        {/* Set New Password Button */}
        {showResetForm && (
          <button 
            onClick={handleSetNewPassword}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#b60232', 
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Set New Password
          </button>
        )}

        {/* Forgot Password Link */}
        {!isSignUp && !isForgotPassword && !showResetForm && (
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button
              onClick={() => {
                setIsForgotPassword(true);
                setErrors({});
                setResetMessage('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline'
              }}
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        {(isForgotPassword || showResetForm) && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={backToLogin}
              style={{
                background: 'none',
                border: 'none',
                color: '#b60232',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              ← Back to Login
            </button>
          </div>
        )}

        {/* Toggle between Login and Sign Up */}
        {!isForgotPassword && !showResetForm && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
                setEmail('');
                setPassword('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#b60232',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
