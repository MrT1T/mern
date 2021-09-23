import axios from 'axios';
import { apiUrl } from '../constant/api.const';

export const Api = axios.create({
  baseURL: apiUrl
});
