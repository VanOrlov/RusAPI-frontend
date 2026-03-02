import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { GenerateDataPayload } from 'src/shared/api/dto';
import { resources } from 'src/shared/api/methods/resources';

export function useGenerateData() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (payload: GenerateDataPayload) => resources.generateResourseData(payload),

    onSuccess: (data, payload) => {
      // Сбрасываем кэш, чтобы UI увидел новый массив data
      void queryCache.invalidateQueries({ key: ['resources', payload.projectNanoId] });

      $q.notify({
        type: 'positive',
        message: `Записи успешно сгенерированы`,
        position: 'top-right',
      });
    },

    onError: () => {
      const message = 'Ошибка при генерации данных';
      $q.notify({ type: 'negative', message, position: 'top-right' });
    },
  });
}
