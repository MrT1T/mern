import { useEffect, useState } from 'react';
import { GroupsService } from '../services/groups.service';

export const useGroup = (groupName = '') => {
  const [group, setGroup] = useState(null);

  useEffect(async () => {
    if (!group && groupName) {
      const needGroup = await GroupsService.getGroup(groupName);
      setGroup(needGroup);
    }
  }, [groupName]);

  return group;
};
