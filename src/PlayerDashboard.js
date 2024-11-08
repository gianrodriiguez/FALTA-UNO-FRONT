import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlayerDashboard.css';

const PlayerDashboard = ({ player }) => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [acceptedMatches, setAcceptedMatches] = useState([]); // Track accepted matches
  const [error, setError] = useState(null);
  const [confirmations, setConfirmations] = useState({}); // Store confirmed player counts

  // Fetch teams and matches based on the player's email
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/teams/player/${player.email}`);
        setTeams(response.data);
      } catch (err) {
        setError('Could not fetch teams.');
      }
    };

    const fetchAllMatches = async () => {
      try {
        const allMatches = await Promise.all(
          teams.map((team) =>
            axios.get(`http://localhost:3003/matches/team/${team.team_name}`).then((res) => res.data)
          )
        );
        setMatches(allMatches.flat());
      } catch (err) {
        setError('Could not fetch matches.');
      }
    };

    fetchTeams();
    if (teams.length > 0) fetchAllMatches();
  }, [player.email, teams]);

  // Fetch confirmations for each match
  useEffect(() => {
    const fetchConfirmations = async () => {
      try {
        const confirmationsData = await Promise.all(
          matches.map((match) =>
            axios
              .get(`http://localhost:3004/confirmations/${match._id}`)
              .then((res) => ({ matchId: match._id, confirmedCount: res.data.confirmedCount, totalCount: res.data.totalCount }))
          )
        );

        const confirmationsMap = confirmationsData.reduce((acc, item) => {
          acc[item.matchId] = `${item.confirmedCount}/${item.totalCount}`;
          return acc;
        }, {});
        setConfirmations(confirmationsMap);
      } catch (err) {
        console.error('Error fetching confirmations:', err);
        setError('Could not fetch player confirmations.');
      }
    };

    if (matches.length > 0) fetchConfirmations();
  }, [matches]);

  const confirmMatch = async (matchId) => {
    try {
      await axios.post('http://localhost:3004/confirm', {
        match_id: matchId,
        player_id: player._id,
      });
      setAcceptedMatches([...acceptedMatches, matchId]); // Add the match ID to accepted matches
    } catch (error) {
      console.error('Error confirming match:', error);
      setError('Could not confirm the match.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="welcome-banner">
        <h1>Welcome, {player.name}!</h1>
      </div>

      <div className="match-list">
        <h2>Your Matches</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {matches.length > 0 ? (
          <ul className="match-items">
            {matches.map((match, index) => (
              <li key={index} className="match-item">
                <span className="team-name">{match.teams[0]}</span>
                <span className="team-vs">vs</span>
                <span className="team-name">{match.teams[1]}</span>
                <span className="match-time">🕒 {match.time}</span>
                <span className="match-date">📅 {match.date}</span>
                
                {/* Display confirmed player count */}
                <span className="confirm-count">
                  {confirmations[match._id] || '0/0'}
                </span>

                {acceptedMatches.includes(match._id) ? (
                  <button className="accepted-button" disabled>
                    Accepted
                  </button>
                ) : (
                  <button
                    className="accept-button"
                    onClick={() => confirmMatch(match._id)}
                  >
                    Accept
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches available</p>
        )}
      </div>

      <Link to="/create-match" className="create-match-button">
        <button>Create new match</button>
      </Link>
      <Link to="/create-team" className="create-match-button">
        <button>Create New Team</button>
      </Link>
    </div>
  );
};

export default PlayerDashboard;