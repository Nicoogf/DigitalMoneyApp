import axios from "./axios.instanse.js";
import Cookies from 'js-cookie';

export const fetchTransactionsRequest = async (accountId) => {
    try {
        const token = Cookies.get('token')
        const response = await axios.get(`/api/accounts/${accountId}/activity`, {
          headers: {
            Authorization: `${token}`
          }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
 
};



