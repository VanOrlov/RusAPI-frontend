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
    description: 'Профиль пользователя с контактами',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'email', type: 'internet.email' },
      { name: 'fullName', type: 'person.fullName' },
      { name: 'firstName', type: 'person.firstName' },
      { name: 'lastName', type: 'person.lastName' },
      { name: 'avatar', type: 'image.avatar' },
      { name: 'jobTitle', type: 'person.jobTitle' },
      { name: 'phone', type: 'phone.number' },
      { name: 'userName', type: 'internet.userName' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'lastLoginAt', type: 'date.past' },
    ],
  },
  {
    id: 'products',
    name: 'Товары',
    description: 'Каталог товаров с ценой и описанием',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'commerce.productName' },
      { name: 'description', type: 'commerce.productDescription' },
      { name: 'price', type: 'commerce.price' },
      { name: 'image', type: 'image.avatar' },
      { name: 'category', type: 'lorem.word' },
      { name: 'sku', type: 'lorem.word' },
      { name: 'inStock', type: 'datatype.boolean' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.recent' },
    ],
  },
  {
    id: 'posts',
    name: 'Посты',
    description: 'Блог или лента публикаций',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'lorem.sentence' },
      { name: 'body', type: 'lorem.paragraph' },
      { name: 'excerpt', type: 'lorem.sentence' },
      { name: 'author', type: 'person.fullName' },
      { name: 'authorEmail', type: 'internet.email' },
      { name: 'tags', type: 'lorem.word' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.past' },
    ],
  },
  {
    id: 'tasks',
    name: 'Задачи',
    description: 'Таск-трекер: задачи и дедлайны',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'lorem.sentence' },
      { name: 'description', type: 'lorem.paragraph' },
      { name: 'completed', type: 'datatype.boolean' },
      { name: 'dueDate', type: 'date.future' },
      { name: 'priority', type: 'lorem.word' },
      { name: 'assignee', type: 'person.fullName' },
      { name: 'assigneeEmail', type: 'internet.email' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.past' },
    ],
  },
  {
    id: 'orders',
    name: 'Заказы',
    description: 'Заказы и покупки',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'productName', type: 'commerce.productName' },
      { name: 'total', type: 'commerce.price' },
      { name: 'status', type: 'lorem.word' },
      { name: 'customerName', type: 'person.fullName' },
      { name: 'customerEmail', type: 'internet.email' },
      { name: 'customerPhone', type: 'phone.number' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.past' },
    ],
  },
  {
    id: 'comments',
    name: 'Комментарии',
    description: 'Комментарии к постам или товарам',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'body', type: 'lorem.paragraph' },
      { name: 'author', type: 'person.fullName' },
      { name: 'authorEmail', type: 'internet.email' },
      { name: 'postId', type: 'lorem.word' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.past' },
    ],
  },
  {
    id: 'categories',
    name: 'Категории',
    description: 'Категории или теги для каталога',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'name', type: 'lorem.sentence' },
      { name: 'description', type: 'lorem.paragraph' },
      { name: 'slug', type: 'lorem.word' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.recent' },
    ],
  },
  {
    id: 'reviews',
    name: 'Отзывы',
    description: 'Отзывы пользователей о товарах',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'productName', type: 'commerce.productName' },
      { name: 'author', type: 'person.fullName' },
      { name: 'authorEmail', type: 'internet.email' },
      { name: 'body', type: 'lorem.paragraph' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.past' },
    ],
  },
  {
    id: 'events',
    name: 'События',
    description: 'Календарь событий или мероприятий',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'title', type: 'lorem.sentence' },
      { name: 'description', type: 'lorem.paragraph' },
      { name: 'startDate', type: 'date.future' },
      { name: 'endDate', type: 'date.future' },
      { name: 'location', type: 'lorem.sentence' },
      { name: 'organizer', type: 'person.fullName' },
      { name: 'organizerEmail', type: 'internet.email' },
      { name: 'createdAt', type: 'date.recent' },
    ],
  },
  {
    id: 'invoices',
    name: 'Счета',
    description: 'Счета и фактуры',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'number', type: 'lorem.word' },
      { name: 'customerName', type: 'person.fullName' },
      { name: 'customerEmail', type: 'internet.email' },
      { name: 'total', type: 'commerce.price' },
      { name: 'status', type: 'lorem.word' },
      { name: 'dueDate', type: 'date.future' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.past' },
    ],
  },
  {
    id: 'organizations',
    name: 'Организации',
    description: 'Компании и контакты',
    schema: [
      { name: 'id', type: 'string.uuid' },
      { name: 'name', type: 'commerce.productName' },
      { name: 'description', type: 'commerce.productDescription' },
      { name: 'contactName', type: 'person.fullName' },
      { name: 'contactEmail', type: 'internet.email' },
      { name: 'contactPhone', type: 'phone.number' },
      { name: 'website', type: 'internet.ipv4' },
      { name: 'createdAt', type: 'date.recent' },
      { name: 'updatedAt', type: 'date.recent' },
    ],
  },
];
