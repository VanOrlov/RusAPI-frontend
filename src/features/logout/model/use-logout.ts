import { auth } from 'src/shared/api/methods/auth';
import { clearToken } from 'src/shared/api/methods/token';

export function useLogout() {
  const logout = async () => {
    try {
      // 1. Говорим бэкенду убить сессию (куки и базу)
      await auth.logout();
    } catch (error) {
      console.error('Ошибка при выходе на сервере:', error);
    } finally {
      // блок finally выполнится В ЛЮБОМ СЛУЧАЕ, даже если сервер упал или пропал интернет

      // 2. Уничтожаем локальный билет
      clearToken();

      // 3. Жесткая перезагрузка страницы
      // Это самый надежный способ очистить всю оперативную память (Vue, Pinia, Colada)
      // и перекинуть пользователя на главную страницу или страницу входа.
      window.location.href = '/login';
    }
  };

  return { logout };
}
