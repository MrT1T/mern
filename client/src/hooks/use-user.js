import { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';

export const useUser = (username = '') => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (!user && username) {
      const needUser = await UsersService.getUser(username);
      setUser(needUser);
    }
  }, [username]);

  return user;
};
