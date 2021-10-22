import { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';

export const useAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const data = await UsersService.getUsers();
    setUsers(data);
  }, []);

  return users;
};
