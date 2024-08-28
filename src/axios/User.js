import axios from "./axios.instanse.js"

// POST /api/users
export const registerRequest = ( userData ) =>  axios.post(`/api/users` , userData)