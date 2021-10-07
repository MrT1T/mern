import axios from 'axios';
import { apiUrl } from '../constant/api.const';
import { USERTOKEN } from '../constant/variable.const';

export const Api = axios.create({
  baseURL: apiUrl
});

Api.interceptors.request.use((request) => {
  const token = JSON.parse(localStorage.getItem(USERTOKEN));
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});
