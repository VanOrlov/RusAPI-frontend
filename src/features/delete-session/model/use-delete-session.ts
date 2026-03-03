import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import { sessions } from 'src/shared/api/methods/sessions';

export function useDeleteSession() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (payload: string) => sessions.delete(payload),
    onSuccess: () => {
      void queryCache.invalidateQueries({ key: ['sessions'] });
      void queryCache.invalidateQueries({ key: ['user', 'me'] });

      $q.notify({
        type: 'positive',
        message: `Сессия успешно удалена`,
        position: 'top-right',
      });
    },
    onError: () => {
      const message = 'Ошибка при удалении сессии';
      $q.notify({ type: 'negative', message, position: 'top-right' });
    },
  });
}
