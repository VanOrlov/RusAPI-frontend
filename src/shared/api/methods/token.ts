import { ref } from 'vue';

export const accessToken = ref(localStorage.getItem('accessToken'));

export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token);
  accessToken.value = token; 
};

export const clearToken = () => {
  localStorage.removeItem('accessToken');
  accessToken.value = null;
};