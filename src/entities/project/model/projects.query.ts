import { useQuery } from '@pinia/colada';
import { projects } from 'src/shared/api/methods/projects';

export function useProjectsQuery() {
  return useQuery({
    key: ['projects'],
    query: () => projects.get(),
  });
}
