import { useEffect, useState } from 'react';
import { GroupsService } from '../services/groups.service';
import type { UseGroupType } from '../types/hooks.type';
import type { GroupDataType } from '../types/services.type';

export const useGroup: UseGroupType = (groupName = '') => {
  const [group, setGroup] = useState<GroupDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!group && groupName) {
        setIsLoading(true);
        try {
          const needGroup = await GroupsService.getGroup(groupName);
          setGroup(needGroup);
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError(e.message);
          }
        }
        setIsLoading(false);
      }
    })();
  }, [groupName]);

  return { group, isLoading, error };
};
