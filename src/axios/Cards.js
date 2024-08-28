import axios from "./axios.instanse.js"
import Cookies from 'js-cookie';

export const getCardsRequest = async (accountId, token) => {
    try {
        const token = Cookies.get('token')
        const response = await axios.get(`/api/accounts/${accountId}/cards`, {
            headers: {
                Authorization: `${token}`,
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
};
