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




export const sendTransactionRequest = async (accountId, amount, dated, description) => {
  try {
      const token = Cookies.get('token')
      const negativeAmount = amount > 0 ? -amount : amount;
      const response = await axios.post(`/api/accounts/${accountId}/transactions`, {
        amount: negativeAmount,
        dated: dated,
        description: description
      }, {
        headers: {
          Authorization: `${token}`
        }
      });
      return response.data;
  } catch (error) {
    console.error("Error en sendTransactionRequest:", error);
    throw error; 
  }
};

