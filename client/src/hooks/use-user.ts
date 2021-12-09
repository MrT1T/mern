import { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';
import type { UseUserType } from '../types/hooks.type';
import type { UserDataType } from '../types/services.type';

export const useUser: UseUserType = (username = '') => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user && username) {
        setIsLoading(true);
        try {
          const needUser = await UsersService.getUser(username);
          setUser(needUser);
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError(e.message);
          }
        }
        setIsLoading(false);
      }
    })();
  }, [username]);

  return { user, isLoading, error };
};
