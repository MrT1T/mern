import { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';

export const useUser = (username = '') => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    try {
      if (!user && username) {
        setIsLoading(true);
        const needUser = await UsersService.getUser(username);
        setUser(needUser);
        setIsLoading(false);
      }
    } catch (e) {
      setError(e);
    }
  }, [username]);

  return { user, isLoading, error };
};
