Любой созданный вами ресурс в **RusAPI** автоматически получает полный набор REST‑операций. Вам не нужно настраивать контроллеры, роутеры или базы данных — всё уже есть «из коробки».

Мы поддерживаем классическую четверку:

- **Create** — создание новых сущностей (`POST`)
- **Read** — получение списка или одной сущности (`GET`)
- **Update** — полное или частичное обновление (`PUT` / `PATCH`)
- **Delete** — удаление (`DELETE`)

Ниже — практические примеры для типичного ресурса `users`.

---

## Создание (Create) — `POST`

Создаём нового пользователя. Все поля будут **проверены по схеме**, а лишние — отброшены.

```http
POST https://rusapi.fun/api/mock/:nanoId/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "age": 25
}
```

Пример ответа:

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "email": "user@example.com",
  "name": "John Doe",
  "age": 25
}
```

> **Важно:** Поле `id` генерируется автоматически и всегда имеет формат UUID v4.

---

## Чтение (Read) — `GET`

### Получить список записей

```http
GET https://rusapi.fun/api/mock/:nanoId/users
```

В ответ вы получите массив объектов (по умолчанию — до 100 элементов).

### Получить одну запись по `id`

```http
GET https://rusapi.fun/api/mock/:nanoId/users/:id
```

Если объект с указанным `id` существует — вернется JSON‑объект, если нет — статус `404 Not Found`.

---

## Обновление (Update) — `PUT` и `PATCH`

Вы можете обновлять данные **полностью** (`PUT`) или **частично** (`PATCH`). В обоих случаях RusAPI проверяет типы полей.

### Полное обновление (`PUT`)

```http
PUT https://rusapi.fun/api/mock/:nanoId/users/:id
Content-Type: application/json

{
  "email": "new@example.com",
  "name": "New Name",
  "age": 30
}
```

### Частичное обновление (`PATCH`)

```http
PATCH https://rusapi.fun/api/mock/:nanoId/users/:id
Content-Type: application/json

{
  "name": "Only Name Updated"
}
```

Если одно из полей не проходит валидацию, вы получите `400 Bad Request` с описанием проблемы.

---

## Удаление (Delete) — `DELETE`

Удаление объекта по `id`:

```http
DELETE https://rusapi.fun/api/mock/:nanoId/users/:id
```

При успешном удалении сервер вернет статус:

```http
204 No Content
```

---

## Типичный workflow для фронтенда

1. **Создаёте схему ресурса** (`users`, `products`, `tasks` и т.д.).
2. **Получаете стартовый список данных** через `GET`.
3. **Добавляете новые сущности** через `POST`.
4. **Редактируете** записи через `PATCH` / `PUT`.
5. **Удаляете** ненужные записи через `DELETE`.

Этот же код позже можно будет «перекинуть» на настоящий бэкенд — контракты запросов и ответов будут максимально похожи.

