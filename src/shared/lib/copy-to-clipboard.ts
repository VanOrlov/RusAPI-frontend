import { copyToClipboard, Notify } from 'quasar';

/**
 * Копирует переданный текст в буфер обмена и показывает уведомление
 * @param text Текст для копирования
 * @param successMessage Сообщение при успешном копировании (опционально)
 */
export const copyText = async (text: string, successMessage = 'Скопировано в буфер обмена') => {
  if (!text) return;

  try {
    await copyToClipboard(text);

    Notify.create({
      type: 'positive',
      message: successMessage,
      icon: 'check_circle',
      position: 'bottom',
      timeout: 2000,
    });
  } catch (error) {
    console.error('Ошибка при копировании:', error);
    Notify.create({
      type: 'negative',
      message: 'Не удалось скопировать текст',
      icon: 'error',
      position: 'bottom',
    });
  }
};
