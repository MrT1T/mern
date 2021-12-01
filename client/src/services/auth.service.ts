import axios from 'axios';
import { API_LINKS } from '../constant/links.const';
import type { AuthBodyType } from '../types/services.type';

interface SignInResponseType {
  token: string;
}

export const AuthService = {
  signIn: (body: AuthBodyType): Promise<SignInResponseType> =>
    axios
      .post<SignInResponseType>(API_LINKS.SING_IN, body)
      .then((response) => response.data)
};
