import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlayerDashboard({ player }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchTeams = async () => {
    try {
      console.log('Fetching teams for player ID:', player._id);
      const response = await axios.get(`http://localhost:3002/teams/player/${player._id}`);
      // const response = await axios.get(`http://team-service:3002/teams/player/${player._id}`);
      console.log('Teams fetched successfully:', response.data);
      setTeams(response.data);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Could not fetch teams.');
    }
  };

  if (player && player._id) {
    fetchTeams();
  } else {
    console.log('No player ID found');
  }
}, [player]);


  return (
    <div>
      <h1>Welcome, {player.name}</h1>
      <p>Email: {player.email}</p>

      <h2>Your Teams</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {teams.length > 0 ? (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>{team.team_name}</li>
          ))}
        </ul>
      ) : (
        <p>No teams found</p>
      )}

      {/* Button to navigate to the Create Match page */}
      <Link to="/create-match">
        <button>Create a New Match</button>
      </Link>
    </div>
  );
}

export default PlayerDashboard;