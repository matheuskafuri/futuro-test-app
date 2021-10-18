import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.thecatapi.com',
  headers: {"x-api-key": "API_KEY"}
})

export default api;