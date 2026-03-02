export interface FakerOption {
  label: string;
  value: string;
  category: string;
}

export const FAKER_OPTIONS: FakerOption[] = [
  // Базовые
  { label: 'Уникальный ID (UUID)', value: 'string.uuid', category: 'Базовые' },
  { label: 'Булево значение (true/false)', value: 'datatype.boolean', category: 'Базовые' },

  // Личные данные
  { label: 'Полное имя', value: 'person.fullName', category: 'Личные данные' },
  { label: 'Имя', value: 'person.firstName', category: 'Личные данные' },
  { label: 'Фамилия', value: 'person.lastName', category: 'Личные данные' },
  { label: 'Должность', value: 'person.jobTitle', category: 'Личные данные' },
  { label: 'Аватар (URL картинки)', value: 'image.avatar', category: 'Личные данные' },

  // Интернет и контакты
  { label: 'Email', value: 'internet.email', category: 'Интернет' },
  { label: 'Имя пользователя (Логин)', value: 'internet.userName', category: 'Интернет' },
  { label: 'Пароль', value: 'internet.password', category: 'Интернет' },
  { label: 'Номер телефона', value: 'phone.number', category: 'Интернет' },
  { label: 'IP адрес', value: 'internet.ipv4', category: 'Интернет' },

  // Коммерция
  { label: 'Название товара', value: 'commerce.productName', category: 'Коммерция' },
  { label: 'Цена', value: 'commerce.price', category: 'Коммерция' },
  { label: 'Описание товара', value: 'commerce.productDescription', category: 'Коммерция' },

  // Текст
  { label: 'Случайное слово', value: 'lorem.word', category: 'Текст' },
  { label: 'Короткое предложение', value: 'lorem.sentence', category: 'Текст' },
  { label: 'Абзац текста', value: 'lorem.paragraph', category: 'Текст' },

  // Даты
  { label: 'Дата (в прошлом)', value: 'date.past', category: 'Даты' },
  { label: 'Дата (в будущем)', value: 'date.future', category: 'Даты' },
  { label: 'Дата (недавняя)', value: 'date.recent', category: 'Даты' },
];
