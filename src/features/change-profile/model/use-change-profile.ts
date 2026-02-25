import { useMutation, useQueryCache } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { ChangeProfileDto } from 'src/shared/api/dto';
import { profile } from 'src/shared/api/methods/change-profile';

export function useChangeProfile() {
  const $q = useQuasar();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: (data: ChangeProfileDto) => profile.change(data),

    onSuccess: () => {
      $q.notify({
        type: 'positive',
        message: 'Данные аккаунта успешно изменены',
        position: 'top-right',
      });
      void queryCache.invalidateQueries({ key: ['user', 'me'] });
    },

    onError: () => {
      const message = 'Ошибка при обновлении данных аккаунта';
      $q.notify({
        type: 'negative',
        message,
      });
    },
  });
}
