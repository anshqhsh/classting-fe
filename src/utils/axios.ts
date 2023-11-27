import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://opentdb.com',
  params: {
    encode: 'base64',
    type: 'multiple',
  },
});

export default axiosInstance;
