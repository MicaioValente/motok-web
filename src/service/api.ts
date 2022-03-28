import axios from 'axios';

const api = axios.create({
    baseURL: 'https://motok-api.herokuapp.com/api/'
});

export default api;
