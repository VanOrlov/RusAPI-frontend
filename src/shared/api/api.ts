import axios from 'axios';
import { clearToken, setToken } from './methods/token';

const baseURL = process.env.API_URL!
export const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

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
    if (!error.response) return Promise.reject(Error(error));

    const originalRequest = error.config;
    const authEndpoints = ['/auth/login', '/auth/register'];
    const isAuthRequest = authEndpoints.some((url) => originalRequest.url?.includes(url));

    if (error.response.status === 401 && !isAuthRequest) {
      if (originalRequest.url?.includes('/auth/refresh')) {
        clearToken();
        window.location.href = '/login?expired=true';
        return Promise.reject(Error(error));
      }

      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token as string}`;
              return API(originalRequest);
            })
            .catch((error) => {
              return Promise.reject(Error(error));
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await axios.post<{ accessToken: string }>(
            `${baseURL}/auth/refresh`,
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
          window.location.href = '/login?expired=true';
          return Promise.reject(new Error(refreshError as string));
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(Error(error));
  },
);
