import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlayerDashboard = ({ player }) => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  // Fetch teams based on player email
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams for player email:', player.email);
        const response = await axios.get(`http://localhost:3002/teams/player/${player.email}`);
        console.log('Teams fetched successfully:', response.data);
        setTeams(response.data);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Could not fetch teams.');
      }
    };

    if (player && player.email) {
      fetchTeams();
    } else {
      console.log('No player email found');
    }
  }, [player]);

  // Function to fetch matches for a given team name
  const fetchMatches = async (teamName) => {
    console.log('Fetching matches for team:', teamName);
    try {
      // const response = await axios.get(`http://match-service:3003/matches/team/${teamName}`);
      const response = await axios.get(`http://localhost:3003/matches/team/${teamName}`);
      console.log('Matches fetched successfully for team', teamName, ':', response.data);
      return response.data; // Return the fetched matches data
    } catch (err) {
      console.error('Error fetching matches for team', teamName, ':', err);
      setError(`Could not fetch matches for ${teamName}.`);
      return []; // Return an empty array on error
    }
  };

  // Fetch matches based on each team
  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        const allMatches = await Promise.all(
          teams.map((team) => fetchMatches(team.team_name))
        );
        console.log('All matches fetched before flattening:', allMatches);
        setMatches(allMatches.flat()); // Flatten the array of arrays
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Could not fetch matches.');
      }
    };

    if (teams.length > 0) {
      console.log('Teams to fetch matches for:', teams);
      fetchAllMatches();
    }
  }, [teams]);

  // Render the dashboard with teams and matches
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

      {/* Matches Section */}
      <h2>Your Matches</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            match && (
              <li key={index}>
                <p><strong>Teams:</strong> {match.teams.join(' vs ')}</p>
                <p><strong>Date:</strong> {match.date}</p>
                <p><strong>Time:</strong> {match.time}</p>
              </li>
            )
          ))}
        </ul>
      ) : (
        <p>No matches available</p>
      )}
    </div>
  );
};

export default PlayerDashboard;