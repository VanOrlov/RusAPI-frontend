<script setup lang="ts">
import { DocsSidebarWidget, DocsInfoWidget } from 'src/widgets/docs/ui';
import { ref } from 'vue';

interface DocItem {
  id: string;
  name: string;
}

const docsMenuItems: DocItem[] = [
  { id: 'intro', name: 'Введение' },
  { id: 'quick-start', name: 'Быстрый старт' },
  { id: 'base-url', name: 'Базовый URL и Роуты' },
  { id: 'crud', name: 'CRUD операции (REST)' },
  { id: 'schemas', name: 'Настройка схем (Faker.js)' },
  { id: 'validation', name: 'Валидация и Типы данных' },
  { id: 'limits', name: 'Лимиты и Ограничения' },
  { id: 'cors', name: 'CORS и Интеграция' },
];

const selectedMenu = ref<DocItem>(docsMenuItems[0]!);

const hanldeSelect = (id: string) => {
  const menu = docsMenuItems.find((el) => el.id === id);
  if (!menu) return false;
  selectedMenu.value = menu;
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">Документация</h1>
    </div>
    <div :class="$style.docspace">
      <DocsSidebarWidget
        :items="docsMenuItems"
        :selected-item-id="selectedMenu.id"
        @select="hanldeSelect"
      />
      <main :class="$style.mainContent">
        <DocsInfoWidget :docs-id="selectedMenu.id" :title="selectedMenu.name" />
      </main>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text-main);
  letter-spacing: -0.5px;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 32px;
  }
}
.docspace {
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.mainContent {
  flex-grow: 1;
}
</style>
