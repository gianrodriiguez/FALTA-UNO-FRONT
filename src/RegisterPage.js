import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { registerPlayer } from './playerService';
import './App.css';

function RegisterPage({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook for navigation

  const handleRegister = async () => {
    try {
      const newPlayer = await registerPlayer(name, email);
      onRegister(newPlayer);  // Pass the registered player to App.js
      setError(null);
      navigate('/dashboard');  // Navigate to the dashboard after successful registration
    } catch (error) {
      // Check the error message for specific messages thrown by registerPlayer
      if (error.message === 'Player already exists') {
        setError('Player already exists. Please try a different email.');
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Error during registration:', error);
    }
  };  


  return (
    <div className="form-container">
      <h2>Register</h2>
      <input 
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input 
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <button onClick={handleRegister} className="button">Register</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RegisterPage;
