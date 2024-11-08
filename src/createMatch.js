import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateMatch.css';

const CreateMatch = ({ player }) => {
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch teams when component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3002/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to load teams. Please try again later.');
      }
    };

    fetchTeams();
  }, []);

  const createMatch = async () => {
    if (!team1 || !team2 || !date || !time) {
      setError('All fields are required.');
      return;
    }

    if (team1 === team2) {
      setError('Team 1 and Team 2 cannot be the same.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/create-match', {
        teams: [team1, team2],
        date,
        time,
        createdBy: player ? player.email : 'unknown',  // Include player email as match creator
      });
      console.log('Match created:', response.data);
      setError(''); // Clear any previous errors
      setSuccessMessage('Match created successfully!');
      setTeam1('');
      setTeam2('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error creating match:', error);
      setError('Failed to create match.');
    }
  };

  return (
    <div className="create-match-container">
      <h2>Create a Match</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="form-group">
        <label>Team 1</label>
        <select value={team1} onChange={(e) => setTeam1(e.target.value)} className="form-select">
          <option value="">Select Team 1</option>
          {teams.map((team) => (
            <option key={team.team_name} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Team 2</label>
        <select value={team2} onChange={(e) => setTeam2(e.target.value)} className="form-select">
          <option value="">Select Team 2</option>
          {teams.map((team) => (
            <option key={team.team_name} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="form-input"
        />
      </div>

      <button onClick={createMatch} className="create-match-button">Create Match</button>
    </div>
  );
};

export default CreateMatch;
