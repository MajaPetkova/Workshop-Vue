import axios from 'axios';

const axiosDJ = axios.create({
  baseUrl: 'https://dummyjson.com',
});

export default axiosDJ;
