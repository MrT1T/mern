import { useEffect, useState } from 'react';
import { GroupsService } from '../services/groups.service';
import type { Item } from '../types/store.type';

export const useAllGroups = (): Item[] => {
  const [groups, setGroups] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const data = await GroupsService.getGroups();
      setGroups(data);
    })();
  }, []);

  return groups;
};
