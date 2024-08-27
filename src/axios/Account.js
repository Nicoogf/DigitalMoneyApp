import axios from "./axios.instanse.js"
import Cookies from 'js-cookie';

export const getAccountDetails = async () => {
    try {
        const token = Cookies.get('token')
        console.log(token)
        const response = await axios.get('/account', {
            headers: {
                Authorization: `${token}`,
            }
        });
        console.log(response)
        return response
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}