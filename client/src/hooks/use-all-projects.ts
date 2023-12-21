import { useEffect, useState } from 'react';
import { ProjectsService } from '../services/projects.service';
import type { Item } from '../types/store.type';

export const useAllProjects = (): Item[] => {
  const [projects, setProjects] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const data = await ProjectsService.getProjects();
      setProjects(data);
    })();
  }, []);

  return projects;
};
