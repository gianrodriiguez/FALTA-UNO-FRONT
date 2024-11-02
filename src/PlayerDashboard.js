import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlayerDashboard({ player }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);


useEffect(() => {
  const fetchTeams = async () => {
    try {
      console.log('Fetching teams for player ID:', player.email);
      const response = await axios.get(`http://localhost:3002/teams/player/${player.email}`);
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
    console.log('No player email found');
  }
}, [player]);

useEffect(() => {
  const fetchAllMatches = async () => {
    try {
      const allMatches = await Promise.all(
        teams.map((team) => fetchMatches(team.name))
      );
      setMatches(allMatches.flat()); // Flatten the results if needed
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Could not fetch matches.');
    }
  };

  if (teams.length > 0) {
    fetchAllMatches();
  }
}, [teams]);


const fetchMatches = async (teamName) => {
  try {
    const response = await axios.get(`http://localhost:3002/matches/team/${teamName}`);
    console.log('Matches fetched successfully:', response.data);
    setMatches(response.data); // Set matches to state or however you manage matches data
  } catch (err) {
    console.error('Error fetching matches:', err);
    setError('Could not fetch matches.');
  }
};



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