import type { SchemaFieldDto } from 'src/shared/api/dto';

export interface ResourceTemplate {
  id: string;
  name: string;
  description: string;
  schema: SchemaFieldDto[];
}

/**
 * Готовые шаблоны схем для эндпоинтов.
 * Первое поле всегда id (string.uuid) — требование бэкенда.
 */
export const RESOURCE_TEMPLATES: ResourceTemplate[] = [
  {
    id: 'users',
    name: 'Пользователи',
    description: 'email, имя, аватар, дата',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'email', type: 'internet.email' },
      { name: 'fullName', type: 'person.fullName' },
      { name: 'avatar', type: 'image.avatar' },
      { name: 'createdAt', type: 'date.recent' },
    ],
  },
  {
    id: 'products',
    name: 'Товары',
    description: 'название, цена, описание',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'commerce.productName' },
      { name: 'price', type: 'commerce.price' },
      { name: 'description', type: 'commerce.productDescription' },
      { name: 'image', type: 'image.avatar' },
    ],
  },
  {
    id: 'posts',
    name: 'Посты',
    description: 'заголовок, текст, автор, дата',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'lorem.sentence' },
      { name: 'body', type: 'lorem.paragraph' },
      { name: 'author', type: 'person.fullName' },
      { name: 'createdAt', type: 'date.recent' },
    ],
  },
  {
    id: 'tasks',
    name: 'Задачи',
    description: 'название, выполнено, срок',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'lorem.sentence' },
      { name: 'completed', type: 'datatype.boolean' },
      { name: 'dueDate', type: 'date.future' },
    ],
  },
  {
    id: 'orders',
    name: 'Заказы',
    description: 'товар, сумма, статус',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'productName', type: 'commerce.productName' },
      { name: 'total', type: 'commerce.price' },
      { name: 'status', type: 'lorem.word' },
    ],
  },
];
