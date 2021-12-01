import { useCallback, useEffect, useState } from 'react';
import { USERTOKEN } from '../constant/variable.const';
import type { AuthHookType } from '../types/hooks.type';

export const useAuth = (): AuthHookType => {
  const [isAuth, setIsAuth] = useState(false);

  const login = useCallback((jwtToken) => {
    setIsAuth(true);
    localStorage.setItem(USERTOKEN, jwtToken);
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);

    localStorage.removeItem(USERTOKEN);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(USERTOKEN);
    if (data) {
      login(data);
    }
  }, [login]);

  return { login, logout, isAuth };
};
