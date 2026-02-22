import { useMutation } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { ChangeProfileDto } from 'src/shared/api/dto';
import { profile } from 'src/shared/api/methods/change-profile';

export function useChangeProfile() {
  const $q = useQuasar();

  return useMutation({
    mutation: (data: ChangeProfileDto) => profile.change(data),

    onSuccess: () => {
      $q.notify({
        type: 'positive',
        message: 'Данные аккаунта успешно изменены',
        position: 'top-right',
      });
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
