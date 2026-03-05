import type { Rule } from 'src/shared/types';

export const nameRules: Rule[] = [
  (val: string) => String(val).length >= 2 || 'Имя должно быть больше 1 символа',
  (val: string) => String(val).length <= 32 || 'Имя должно быть короче 33 символов',
];

export const emailRules: Rule[] = [
  (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Невалидный формат Email',
];

export const passwordRules: Rule[] = [
  (val: string) => String(val).length > 6 || 'Пароль должен быть больше 6 символов',
  (val: string) => String(val).length < 35 || 'Пароль должен быть короче 35 символов',
  (val: string) => /[A-Z]/.test(val) || 'Пароль должен содержать минимум 1 заглавный символ',
  (val: string) => /[0-9]/.test(val) || 'Пароль должен содержать минимум 1 цифру',
  (val: string) => /[^\w\s]/.test(val) || 'Пароль должен содержать минимум 1 специальный символ',
];
