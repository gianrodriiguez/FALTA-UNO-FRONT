import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlayerDashboard({ player }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  // Fetch teams when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Assuming the endpoint is something like `/teams/player/:playerId`
        const response = await axios.get(`http://localhost:3002/teams/player/${player._id}`);
        setTeams(response.data);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Could not fetch teams.');
      }
    };

    fetchTeams();
  }, [player._id]); // Runs the effect when player._id changes

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