import { useEffect, useState } from 'react';
import { ProjectsService } from '../services/projects.service';
import type { UseProjectType } from '../types/hooks.type';
import type { ProjectDataType } from '../types/services.type';

export const useProject: UseProjectType = (projectName = '') => {
  const [project, setProject] = useState<ProjectDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!project && projectName) {
        setIsLoading(true);
        try {
          const needProject = await ProjectsService.getProject(projectName);
          setProject(needProject);
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError(e.message);
          }
          if (typeof e === 'string') {
            setError(e);
          }
        }
        setIsLoading(false);
      }
    })();
  }, [projectName]);

  return { project, isLoading, error };
};
