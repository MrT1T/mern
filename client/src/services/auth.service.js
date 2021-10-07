import axios from 'axios';
import { apiUrl } from '../constant/api.const';

export const AuthService = {
  signIn: (body) =>
    axios.post(`${apiUrl}auth/signin`, body).then((response) => response.data)
};
