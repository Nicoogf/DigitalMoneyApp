import axios from "./axios.instanse.js";
import Cookies from 'js-cookie';

export const fetchTransferencesRequest = async (accountId) => {
    try {
        const token = Cookies.get('token')
        const response = await axios.get(`/api/accounts/${accountId}/transferences`, {
          headers: {
            Authorization: `${token}`
          }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
 
};


export const createDepositRequest = async (accountId, depositData) => {
  try {
      const token = Cookies.get('token');
      const response = await axios.post(`/api/accounts/${accountId}/deposits`, depositData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
  } catch (error) {
      console.error("Error al realizar el depósito:", error);
      throw error; 
  }
};



export const createTransferenceRequest = async (accountId, transferenceData) => {
  try {
    const token = Cookies.get('token');
    const response = await axios.post(`/api/accounts/${accountId}/transferences`, transferenceData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al realizar la transferencia:', error);
    throw error;
  }
};