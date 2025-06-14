import axios from "axios";

export const api = axios.create({
    baseURL: 'https://e237-2804-6e08-12-735e-800b-7288-11a9-6982.ngrok-free.app/'
})