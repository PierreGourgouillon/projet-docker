import axios from 'axios';

const API = axios.create({
  baseURL: 'https://back-service-208091987949.europe-west9.run.app/api/v1',
});

export default API;
