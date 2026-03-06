import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import { projects } from 'src/shared/api/methods/projects';

export function useDeleteProject() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (payload: string) => projects.delete(payload),

    onSuccess: () => {
      void queryCache.invalidateQueries({ key: ['projects'] });

      $q.notify({
        type: 'positive',
        message: 'Проект успешно удален',
        position: 'top-right',
      });
    },

    onError: () => {
      const message = 'Ошибка при удалении проекта';
      $q.notify({ type: 'negative', message, position: 'top-right' });
    },
  });
}
