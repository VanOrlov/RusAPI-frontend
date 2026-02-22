import { ref } from 'vue';

// 1. Инициализируем реактивную переменную при старте приложения
export const accessToken = ref(localStorage.getItem('accessToken'));

// 2. Функция для логина
export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token);
  accessToken.value = token; // ТРИГГЕР ДЛЯ VUE! Шапка перерисуется
};

// 3. Функция для логаута
export const clearToken = () => {
  localStorage.removeItem('accessToken');
  accessToken.value = null; // ТРИГГЕР ДЛЯ VUE!
};