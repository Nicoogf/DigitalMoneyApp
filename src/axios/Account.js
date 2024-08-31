import axios from "./axios.instanse.js"
import Cookies from 'js-cookie';

export const getTokenRequest = async () => {
    try {
        const token = Cookies.get('token')
        const response = await axios.get('/api/account', {
            headers: {
                Authorization: `${token}`,
            }
        });
        return response
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}