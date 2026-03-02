import { auth } from 'src/shared/api/methods/auth';
import { clearToken } from 'src/shared/api/methods/token';

export function useLogout() {
  const logout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error('Ошибка при выходе на сервере:', error);
    } finally {
      clearToken();
      window.location.href = '/login';
    }
  };

  return { logout };
}
