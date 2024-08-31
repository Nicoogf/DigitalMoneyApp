import axios from "./axios.instanse.js"
import Cookies from 'js-cookie';

// POST /api/users
export const registerRequest = ( userData ) =>  axios.post(`/api/users` , userData)



export const getDataUserRequest = async (id_user) => {
    try {
        const token = Cookies.get('token')      
        const response = await axios.get(`/api/users/${id_user}`, {
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
