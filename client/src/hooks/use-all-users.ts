import { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';
import type { Item } from '../types/store.type';

export const useAllUsers = (): Item[] => {
  const [users, setUsers] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const data = await UsersService.getUsers();
      setUsers(data);
    })();
  }, []);

  return users;
};
