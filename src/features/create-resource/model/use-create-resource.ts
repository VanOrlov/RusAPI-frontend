import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { CreateResourcePayload } from 'src/shared/api/dto';
import { resources } from 'src/shared/api/methods/resources';

export function useCreateResource() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (payload: CreateResourcePayload) => resources.create(payload),

    onSuccess: (data, payload) => {
      void queryCache.invalidateQueries({ key: ['resources', payload.projectNanoId] });

      $q.notify({
        type: 'positive',
        message: `Эндпоинт /${data.name} успешно создан`,
        position: 'top-right',
      });
    },

    onError: () => {
      const message = 'Ошибка при создании эндпоинта';
      $q.notify({ type: 'negative', message, position: 'top-right' });
    },
  });
}
