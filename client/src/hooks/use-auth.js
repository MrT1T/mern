import { useCallback, useEffect, useState } from 'react';
import { USERTOKEN } from '../constant/variable.const';

export const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = useCallback((jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem(USERTOKEN, JSON.stringify(jwtToken));
  }, []);

  const logout = useCallback(() => {
    setToken(null);

    localStorage.removeItem(USERTOKEN);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USERTOKEN));
    if (data) {
      login(data);
    }
  }, [login]);

  return { login, logout, isAuth: !!token };
};
