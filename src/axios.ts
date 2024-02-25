import axios from 'axios';

const HOST = process.env.NEXT_PUBLIC_HOST;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const axiosInstance = axios.create({
  baseURL: `${HOST}${BASE_PATH}`,
});

export default axiosInstance;
