import { useEffect, useState } from 'react';
import { GroupsService } from '../services/groups.service';
import type { UseGroupType } from '../types/hooks.type';
import type { GroupFetchType } from '../types/services.type';

export const useGroup: UseGroupType = (groupName = '') => {
  const [group, setGroup] = useState<GroupFetchType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!group && groupName) {
        try {
          setIsLoading(true);
          const needGroup = await GroupsService.getGroup(groupName);
          setGroup(needGroup);
          setIsLoading(false);
        } catch (e: unknown) {
          setIsLoading(false);
          if (e instanceof Error) {
            setError(e.message);
          }
        }
      }
    })();
  }, [groupName]);

  return { group, isLoading, error };
};
