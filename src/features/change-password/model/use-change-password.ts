import { useMutation } from '@pinia/colada';
import { useQuasar } from 'quasar';
import type { ChangePasswordDto } from 'src/shared/api/dto';
import { password } from 'src/shared/api/methods/change-password';

export function useChangePassword() {
  const $q = useQuasar();

  return useMutation({
    mutation: (data: ChangePasswordDto) => password.change(data),

    onSuccess: () => {
      $q.notify({
        type: 'positive',
        message: 'Пароль успешно изменен',
        position: 'top-right',
      });
    },

    onError: () => {
      const message = 'Ошибка при обновлении пароля';
      $q.notify({
        type: 'negative',
        message,
      });
    },
  });
}
