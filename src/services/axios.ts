import axios from 'axios';

export const BASE_URL = (import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_BASE_URL) || 'http://localhost:8080';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});