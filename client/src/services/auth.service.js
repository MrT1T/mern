import axios from 'axios';
import { API_LINKS } from '../constant/links.const';

export const AuthService = {
  signIn: (body) =>
    axios.post(API_LINKS.SING_IN, body).then((response) => response.data)
};
