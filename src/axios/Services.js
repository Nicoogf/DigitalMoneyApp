import axios from "./axios.instanse.js"


export const fetchServicesRequest = async () => {
    try {
        const response = await axios.get('https://digitalmoney.digitalhouse.com/service');
        return response.data;
    } catch (error) {
        throw error;
    }
};