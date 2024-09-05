import axios from "./axios.instanse.js"
import Cookies from 'js-cookie';


export const signInRequest = async( userData ) => {
    try {          
        const response = await axios.post('/api/login', userData);      
        const token = response.data.token;    
     
        Cookies.set('token', token, {
          expires: 1,      
          path: '/', 
        });
    
        return response;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
}
