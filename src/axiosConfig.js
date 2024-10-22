import axios from 'axios';

const registerPlayer = async (name, email) => {
    try {
        const response = await axios.post('http://localhost:3001/register', { name, email });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

const loginPlayer = async (email) => {
    try {
        const response = await axios.post('http://localhost:3001/login', { email });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
