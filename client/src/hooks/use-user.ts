import { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';
import type { UseUserType } from '../types/hooks.type';
import type { UserFetchType } from '../types/services.type';

export const useUser: UseUserType = (username = '') => {
  const [user, setUser] = useState<UserFetchType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!user && username) {
          setIsLoading(true);
          const needUser = await UsersService.getUser(username);
          setUser(needUser);
          setIsLoading(false);
        }
      } catch (e: unknown) {
        setIsLoading(false);
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    })();
  }, [username]);

  return { user, isLoading, error };
};
