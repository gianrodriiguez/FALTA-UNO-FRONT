import React, { useState } from 'react';
import axios from 'axios';

const CreateMatch = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const createMatch = async () => {
    if (!team1 || !team2 || !date || !time) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/create-match', {
        teams: [team1, team2],  // Array of teams
        date,
        time
      });
      console.log(response.data);
      setError('');  // Clear any previous errors
    } catch (error) {
      console.error(error);
      setError('Failed to create match.');
    }
  };

  return (
    <div>
      <h2>Create a Match</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Team 1</label>
        <input
          type="text"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          placeholder="Enter team 1 name"
        />
      </div>

      <div>
        <label>Team 2</label>
        <input
          type="text"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          placeholder="Enter team 2 name"
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button onClick={createMatch}>Create Match</button>
    </div>
  );
};

export default CreateMatch;
