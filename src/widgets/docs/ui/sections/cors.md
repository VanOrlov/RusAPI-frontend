Чтобы вы могли обращаться к **RusAPI** напрямую из браузера, сервер настроен с учётом политики **CORS (Cross-Origin Resource Sharing)**.

Это позволяет:

- запрашивать моки с `https://rusapi.fun` из локального `http://localhost:3000`;
- использовать RusAPI в Storybook, CodeSandbox и других инструментах;
- не поднимать прокси‑слои только ради разработки.

---

## Что такое CORS в двух словах

Браузер по умолчанию не разрешает JavaScript‑коду обращаться к другим доменам (origin).  
Чтобы это было возможно, сервер должен явно ответить заголовками:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

RusAPI настроен так, чтобы типичные фронтенд‑кейсы работали «из коробки».

---

## Типичный пример запроса с фронта

```javascript
const NANO_ID = 'your-nano-id';

async function loadUsers() {
  const response = await fetch(`https://rusapi.fun/api/mock/${NANO_ID}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

Этот код можно запускать прямо из браузера (React, Vue, ванильный JS) без дополнительной серверной прослойки.

---

## Предзапросы (preflight) и нестандартные заголовки

Если вы отправляете запросы вида:

- с методом `PUT`, `PATCH`, `DELETE`;
- с кастомными заголовками (`Authorization`, `X-Trace-Id` и т.д.);

браузер сначала выполнит **preflight‑запрос**:

```http
OPTIONS https://rusapi.fun/api/mock/:nanoId/users
```

Если CORS‑настройки позволяют такие запросы, браузер выполнит основной `POST` / `PATCH` / `DELETE`.

При проблемах с CORS:

- проверьте, что вы не добавляете лишние нестандартные заголовки;
- убедитесь, что URL совпадает с тем, который показан в интерфейсе RusAPI.

---

## Интеграция в различные окружения

**Локальная разработка**  
Используйте прямой `fetch` к `https://rusapi.fun/api/mock/...`. Никаких дополнительных настроек не требуется.

**Storybook / Design Systems**  
Вы можете подключать RusAPI как внешний источник данных для компонент. Это удобно для демонстрации реальных сценариев.

**Online playgrounds (CodeSandbox, StackBlitz)**  
Так как RusAPI доступен по HTTPS и поддерживает CORS, вы можете использовать один и тот же `baseUrl` в любых онлайн‑песочницах.

---

## Когда может понадобиться свой прокси

Иногда команды предпочитают:

- проксировать RusAPI через dev‑сервер фронтенда;
- добавлять авторизацию / логирование поверх моков.

В этом случае:

1. Настройте прокси на своём dev‑сервере (например, Vite/webpack devServer).
2. Проксируйте все запросы `/api/mock/*` на `https://rusapi.fun`.
3. Используйте локальный `/api/mock/...` как будто это настоящий бэкенд.

Такой подход поможет безболезненно переключиться на реальный API позже — достаточно поменять адрес в прокси.

