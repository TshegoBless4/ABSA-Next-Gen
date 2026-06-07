// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaArrowLeft } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup, resetPassword, checkEmailExists } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!email.includes('@')) newErrors.email = 'Email must contain @';
    else if (!email.includes('.')) newErrors.email = 'Email must contain a domain';
    if (!isForgotPassword && !showResetForm) {
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 3) newErrors.password = 'Password must be at least 3 characters';
    }
    if (showResetForm && !newPassword) newErrors.newPassword = 'New password is required';
    else if (showResetForm && newPassword.length < 3) newErrors.newPassword = 'Password must be at least 3 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    if (isSignUp) {
      const success = signup(email, password);
      if (success) navigate('/');
      else setErrors({ general: 'User already exists. Please login.' });
    } else {
      const success = login(email, password);
      if (success) navigate('/');
      else setErrors({ general: 'Invalid email or password' });
    }
    setLoading(false);
  };

  const handleSendResetLink = () => {
    if (!email) { setErrors({ email: 'Please enter your email address' }); return; }
    if (checkEmailExists(email)) {
      setResetMessage(`A password reset link has been sent to ${email}. For demo purposes, enter your new password below.`);
      setShowResetForm(true);
      setErrors({});
    } else {
      setErrors({ general: 'Email not found. Please sign up first.' });
    }
  };

  const handleSetNewPassword = () => {
    if (!validateForm()) return;
    if (resetPassword(email, newPassword)) {
      setResetMessage('Password reset successful! You can now login with your new password.');
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', padding: '20px' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%', backgroundColor: '#1a1a2e', border: '1px solid #2d2729', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #b60232 0%, #ff780f 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>A</span>
          </div>
          <h1 style={{ fontSize: '24px', marginBottom: '4px', color: 'white' }}>ABSA NextGen Wealth</h1>
          <p style={{ fontSize: '12px', color: '#acacac' }}>Your first five years start here</p>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '20px', color: '#ffffff' }}>
          {isForgotPassword ? 'Reset Password' : (isSignUp ? 'Create Account' : 'Welcome Back')}
        </h2>

        {!isForgotPassword && !isSignUp && !showResetForm && (
          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px', textAlign: 'center' }}>
            {/* <p style={{ fontSize: '12px', color: '#acacac', marginBottom: '4px' }}>Demo Credentials</p> */}
            <p style={{ fontSize: '11px', color: '#F4A261' }}>Email: user@example.com | Password: password123</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#acacac', fontSize: '14px' }} />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: errors.email ? '1px solid #b60232' : '1px solid #2d2729', backgroundColor: '#2d2729', color: 'white', fontSize: '14px' }}
                disabled={showResetForm} />
            </div>
            {errors.email && <div style={{ color: '#b60232', fontSize: '11px', marginTop: '4px' }}>{errors.email}</div>}
          </div>
          
          {!isForgotPassword && !showResetForm && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#acacac', fontSize: '14px' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: '' }); }}
                  style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: errors.password ? '1px solid #b60232' : '1px solid #2d2729', backgroundColor: '#2d2729', color: 'white', fontSize: '14px' }} />
              </div>
              {errors.password && <div style={{ color: '#b60232', fontSize: '11px', marginTop: '4px' }}>{errors.password}</div>}
            </div>
          )}

          {showResetForm && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#acacac', fontSize: '14px' }} />
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value); if (errors.newPassword) setErrors({ ...errors, newPassword: '' }); }}
                  style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: errors.newPassword ? '1px solid #b60232' : '1px solid #2d2729', backgroundColor: '#2d2729', color: 'white', fontSize: '14px' }} />
              </div>
              {errors.newPassword && <div style={{ color: '#b60232', fontSize: '11px', marginTop: '4px' }}>{errors.newPassword}</div>}
            </div>
          )}

          {resetMessage && (
            <div style={{ fontSize: '12px', marginBottom: '16px', textAlign: 'center', padding: '10px', backgroundColor: showResetForm ? '#b6023220' : '#00A86B20', borderRadius: '8px', color: showResetForm ? '#F4A261' : '#00A86B' }}>
              {resetMessage}
            </div>
          )}

          {errors.general && (
            <div style={{ color: '#b60232', fontSize: '12px', marginBottom: '16px', textAlign: 'center', padding: '10px', backgroundColor: '#b6023220', borderRadius: '8px' }}>
              {errors.general}
            </div>
          )}
          
          {!isForgotPassword && !showResetForm && (
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? 'Please wait...' : (isSignUp ? <><FaUserPlus /> Sign Up</> : <><FaSignInAlt /> Login</>)}
            </button>
          )}

          {isForgotPassword && !showResetForm && (
            <button type="button" onClick={handleSendResetLink} className="btn-primary" style={{ width: '100%', padding: '12px' }}>Send Reset Link</button>
          )}

          {showResetForm && (
            <button type="button" onClick={handleSetNewPassword} className="btn-primary" style={{ width: '100%', padding: '12px' }}>Set New Password</button>
          )}
        </form>

        {!isSignUp && !isForgotPassword && !showResetForm && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button onClick={() => { setIsForgotPassword(true); setErrors({}); setResetMessage(''); }} style={{ background: 'none', border: 'none', color: '#acacac', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}>Forgot Password?</button>
          </div>
        )}

        {(isForgotPassword || showResetForm) && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button onClick={backToLogin} style={{ background: 'none', border: 'none', color: '#F4A261', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', margin: '0 auto' }}>
              <FaArrowLeft size={12} /> Back to Login
            </button>
          </div>
        )}

        {!isForgotPassword && !showResetForm && (
          <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #2d2729' }}>
            <button onClick={() => { setIsSignUp(!isSignUp); setErrors({}); setEmail(''); setPassword(''); }} style={{ background: 'none', border: 'none', color: '#F4A261', cursor: 'pointer', fontSize: '13px' }}>
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;