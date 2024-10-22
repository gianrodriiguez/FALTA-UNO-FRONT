import axios from 'axios';
import React, { useState } from 'react';

const BASE_URL = 'http://localhost:3004';  // Confirmation Microservice base URL

const MatchConfirmation = ({ matchId, playerId }) => {
    const [confirmationStatus, setConfirmationStatus] = useState(null);

    // Function to confirm player participation in the match
    const confirmParticipation = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/confirm`, {
                match_id: matchId,
                player_id: playerId
            });
            setConfirmationStatus('confirmed');
            console.log('Player confirmed:', response.data);
        } catch (error) {
            console.error("Error confirming participation:", error);
            setConfirmationStatus('error');
        }
    };

    return (
        <div>
            <h3>Confirm Your Participation</h3>
            <button onClick={confirmParticipation}>Confirm</button>
            {confirmationStatus === 'confirmed' && <p>You have confirmed your participation!</p>}
            {confirmationStatus === 'error' && <p>There was an error confirming your participation.</p>}
        </div>
    );
};

export default MatchConfirmation;

