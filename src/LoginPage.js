import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { loginPlayer } from './playerService';
import './App.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async () => {
    try {
      const loggedInPlayer = await loginPlayer(email);
      console.log('Login successful, navigating to dashboard', loggedInPlayer);
      onLogin(loggedInPlayer);  // Pass the logged-in player to App.js
      setError(null);
      navigate('/dashboard');  // Navigate to the dashboard after successful login
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Error during login:', error);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const loggedInPlayer = await loginPlayer(email);
  //     onLogin(loggedInPlayer);  // Pass the logged-in player to App.js
  //     setError(null);
  //     navigate('/dashboard');  // Navigate to the dashboard after successful login
  //   } catch (error) {
  //     setError('Login failed. Please try again.');
  //     console.error('Error during login:', error);
  //   }
  // };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input 
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <button onClick={handleLogin} className="button">Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;
