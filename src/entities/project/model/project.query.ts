import { useQuery } from '@pinia/colada';
import { projects } from 'src/shared/api/methods/projects';
import type { Ref } from 'vue';
import { unref } from 'vue';

export function useProjectQuery(projectId: string | Ref<string>) {
  return useQuery({
    key: () => ['project', unref(projectId)],
    query: () => projects.getById(unref(projectId)),
    enabled: () => !!unref(projectId),
  });
}
