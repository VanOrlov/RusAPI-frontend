import { useQuery } from '@pinia/colada';
import { resources } from 'src/shared/api/methods/resources';
import type { Ref } from 'vue';
import { unref } from 'vue';

export function useResourcesQuery(projectNanoId: string | Ref<string>) {
  return useQuery({
    // Ключ включает ID проекта: ['resources', 'Vx9_k2m']
    key: () => ['resources', unref(projectNanoId)],
    query: () => resources.getByProject(unref(projectNanoId)),
    enabled: () => !!unref(projectNanoId),
  });
}
