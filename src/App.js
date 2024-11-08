import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';       // Correct if LoginPage is default exported
import RegisterPage from './RegisterPage'; // Correct if RegisterPage is default exported
import PlayerDashboard from './PlayerDashboard'; // Correct if PlayerDashboard is default exported
import CreateMatch from './createMatch';   // Correct if CreateMatch is default exported
import './App.css';
import CreateTeam from './CreateTeam';

function App() {
  const [player, setPlayer] = useState(null);  // To store the logged-in or registered player

  const handleLogin = (loggedInPlayer) => {
    setPlayer(loggedInPlayer);  // Store logged-in player data
  };

  const handleRegister = (registeredPlayer) => {
    setPlayer(registeredPlayer);  // Store registered player data
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              player ? (
                <Navigate to="/dashboard" />
              ) : (
                <div>
                  <img src="/soccer-ball.jpg" alt="Soccer Ball" className="soccer-ball" />
                  <h1 className="title">Falta Uno!</h1>
                  <Link to="/login">
                    <button className="button">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="button">Register</button>
                  </Link>
                </div>
              )
            }
          />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Register Page */}
          <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />

          {/* Dashboard Page (shown after login/register) */}
          <Route path="/dashboard" element={player ? <PlayerDashboard player={player} /> : <Navigate to="/login" />} />

          {/* Create Match Page */}
      <Route path="/create-match" element={player ? <CreateMatch player={player} /> : <Navigate to="/login" />} />

      <Route path="/create-team" element={player ? <CreateTeam player={player} /> : <Navigate to="/login" />} />
    </Routes>
      </div>
    </Router>
  );
}

export default App;
