import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { CreateProjectPayload } from 'src/shared/api/dto';
import { projects } from 'src/shared/api/methods/projects';

export function useCreateProject() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (payload: CreateProjectPayload) => projects.create(payload),

    onSuccess: () => {
      void queryCache.invalidateQueries({ key: ['projects'] });

      $q.notify({
        type: 'positive',
        message: 'Проект успешно создан',
        position: 'top-right',
      });
    },

    onError: () => {
      const message = 'Ошибка при создании проекта';
      $q.notify({ type: 'negative', message, position: 'top-right' });
    },
  });
}
