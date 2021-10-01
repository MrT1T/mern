import { useEffect, useState } from 'react';
import { GroupsService } from '../services/groups.service';

export const useAllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(async () => {
    if (groups.length === 0) {
      const data = await GroupsService.getGroups();
      setGroups(data);
    }
  }, []);

  return groups;
};
