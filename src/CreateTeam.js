import React, { useState } from 'react';
import axios from 'axios';
import './CreateTeam.css';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [emails, setEmails] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const createTeam = async () => {
    if (!teamName || emails.some(email => !email)) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/create-team', {
        team_name: teamName,
        players: emails,
      });
      console.log('Team created:', response.data);
      setError(''); // Clear any previous errors
      setSuccessMessage('Team created successfully!');
      setTeamName('');
      setEmails(['', '', '', '', '']);
    } catch (error) {
      console.error('Error creating team:', error);
      setError('Failed to create team.');
    }
  };

  return (
    <div className="create-team-container">
      <h2>Create a Team</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="form-group">
        <label>Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="form-input"
          placeholder="Enter team name"
        />
      </div>

      {emails.map((email, index) => (
        <div key={index} className="form-group">
          <label>Player {index + 1}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
            className="form-input"
            placeholder="Enter player email"
          />
        </div>
      ))}

      <button onClick={createTeam} className="create-team-button">Create Team</button>
    </div>
  );
};

export default CreateTeam;