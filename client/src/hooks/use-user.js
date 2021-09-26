import { useAllUsers } from './use-all-users';

export const useUser = (name) => {
  const { users } = useAllUsers();
  return users.find(({ username }) => username === name);
};
