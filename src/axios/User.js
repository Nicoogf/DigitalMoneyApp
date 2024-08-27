import axios from "./axios.instanse.js"


export const registerRequest = ( userData ) =>  axios.post(`/users` , userData)