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

export const DeleteCardRequest = async (accountId, cardId) => {
    try {
        const token = Cookies.get('token')
        const response = await axios.delete(`/api/accounts/${accountId}/cards/${cardId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const CreateCardRequest = async (accountId, cardData) => {
    try {
      const token = Cookies.get('token')
      console.log(token)
      const response = await axios.post(`/api/accounts/${accountId}/cards`, cardData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  };
