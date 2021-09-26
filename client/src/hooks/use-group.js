import { useAllGroups } from './use-all-groups';

export const useGroup = (groupName) => {
  const { groups } = useAllGroups();
  return groups.find(({ title }) => title === groupName);
};
