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


// import React from 'react';
// import CreateMatch from './createMatch';  // Import CreateMatch component

// function PlayerDashboard({ player }) {
//   return (
//     <div>
//       <h1>Welcome, {player.name}</h1>
//       <p>Email: {player.email}</p>

//       <h2>Your Teams</h2>
//       {/* Render teams if available (you can adjust this based on your data structure) */}
//       <ul>
//         {/* Replace with actual team data */}
//         <li>Team 1</li>
//         <li>Team 2</li>
//       </ul>

//       {/* Render the CreateMatch component directly here */}
//       <h2>Create a New Match</h2>
//       <CreateMatch />  {/* CreateMatch component is rendered inside the dashboard */}
//     </div>
//   );
// }

// export default PlayerDashboard;


