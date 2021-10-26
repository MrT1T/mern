import { useEffect, useState } from 'react';
import { GroupsService } from '../services/groups.service';

export const useGroup = (groupName = '') => {
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    if (!group && groupName) {
      try {
        setIsLoading(true);
        const needGroup = await GroupsService.getGroup(groupName);
        setGroup(needGroup);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(e);
      }
    }
  }, [groupName]);

  return { group, isLoading, error };
};
