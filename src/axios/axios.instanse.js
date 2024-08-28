import axios from "axios";

const instance  = axios.create({
    baseURL: "https://digitalmoney.digitalhouse.com"
})

export default instance