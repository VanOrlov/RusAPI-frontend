import axios from 'axios';
import { clearToken, setToken } from './methods/token';

export const API = axios.create({
  baseURL: process.env.API_URL!,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === ЛОГИКА REFRESH ТОКЕНА ===

// 1. Флаг: обновляем ли мы токен прямо сейчас?
let isRefreshing = false;
// 2. Очередь запросов, которые ждут нового токена
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

// Функция для обработки очереди
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Если сервер вообще не ответил (упал интернет или CORS)
    if (!error.response) return Promise.reject(Error(error));

    const originalRequest = error.config;
    const authEndpoints = ['/auth/login', '/auth/register'];
    const isAuthRequest = authEndpoints.some((url) => originalRequest.url?.includes(url));

    // Если ошибка 401 и это НЕ страница входа/регистрации
    if (error.response.status === 401 && !isAuthRequest) {
      // ЗАЩИТА ОТ БЕСКОНЕЧНОГО ЦИКЛА:
      // Если сам запрос на refresh упал с 401 (значит refresh-токен тоже протух)
      if (originalRequest.url?.includes('/auth/refresh')) {
        clearToken();
        window.location.href = '/login';
        return Promise.reject(Error(error));
      }

      // Если запрос еще не пытались повторить
      if (!originalRequest._retry) {
        // Если кто-то другой уже обновляет токен, мы просто встаем в очередь
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token as string}`;
              return API(originalRequest); // Повторяем запрос с новым токеном!
            })
            .catch((error) => {
              return Promise.reject(Error(error));
            });
        }

        // Если мы первые, кто столкнулся с 401 — начинаем процедуру обновления
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // ВАЖНО: используем голый axios, чтобы наш интерсептор не зациклился!
          // Кука с refresh-токеном улетит автоматически благодаря withCredentials: true
          const { data } = await axios.post<{ accessToken: string }>(
            `${process.env.API_URL}/auth/refresh`,
            {},
            { withCredentials: true },
          );

          setToken(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          processQueue(null, data.accessToken);

          return API(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          clearToken();
          window.location.href = '/login';
          return Promise.reject(new Error(refreshError as string));
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(Error(error));
  },
);
