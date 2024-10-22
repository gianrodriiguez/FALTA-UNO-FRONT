import axios from 'axios';

const BASE_URL = 'http://localhost:3002';  // Team Microservice base URL

// Function to create a new team
export const createTeam = async (teamName, playerIds) => {
    try {
        const response = await axios.post(`${BASE_URL}/create-team`, { team_name: teamName, players: playerIds });
        return response.data;  // Returns the newly created team
    } catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
};

// Function to get all teams
export const getAllTeams = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/teams`);
        return response.data;  // Returns a list of all teams
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
};
