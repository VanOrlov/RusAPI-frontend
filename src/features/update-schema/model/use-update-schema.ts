import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { UpdateSchemaPayload } from 'src/shared/api/dto';
import { resources } from 'src/shared/api/methods/resources';

export function useUpdateSchema() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (payload: UpdateSchemaPayload) => resources.updateResourceSchema(payload),
    onSuccess: (data, payload) => {
      // Сбрасываем кэш ресурсов для этого проекта, чтобы свежая схема подтянулась
      void queryCache.invalidateQueries({ key: ['resources', payload.projectNanoId] });
      $q.notify({
        type: 'positive',
        message: 'Схема успешно сохранена',
        position: 'top-right',
      });
    },
    onError: () => {
      const message = 'Ошибка при сохранении схемы';
      $q.notify({ type: 'negative', message, position: 'top-right' });
    },
  });
}
