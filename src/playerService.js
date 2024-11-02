import axios from 'axios';

const BASE_URL = 'http://localhost:3001';  // Make sure this points to your backend

// Function to register a new player
export const registerPlayer = async (name, email) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, { name, email });
        return response.data;
    } catch (error) {
        // Check if the error has a response (from the server)
        if (error.response) {
            if (error.response.status === 400 && error.response.data.error === 'Player with this email already exists') {
                throw new Error('Player already exists');
            }
            throw new Error('Registration failed');
        } else {
            throw new Error('Network error, please try again later');
        }
    }
};


// Function to login an existing player
export const loginPlayer = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email });
        return response.data;
    } catch (error) {
        console.error('Error logging in player:', error);
        throw error;
    }
};