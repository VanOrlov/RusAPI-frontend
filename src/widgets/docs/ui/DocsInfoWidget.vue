<script setup lang="ts">
import { computed, type Component } from 'vue';
import IntroSection from './sections/intro.md';
import QuickStartSection from './sections/quick-start.md';
import BaseUrlSection from './sections/base-url.md';
import CrudSection from './sections/crud.md';
import SchemasSection from './sections/schemas.md';
import ValidationSection from './sections/validation.md';
import LimitsSection from './sections/limits.md';
import CorsSection from './sections/cors.md';

const props = defineProps<{
  docsId: string;
  title: string;
}>();

const componentMap: Record<string, Component> = {
  intro: IntroSection,
  'quick-start': QuickStartSection,
  'base-url': BaseUrlSection,
  crud: CrudSection,
  schemas: SchemasSection,
  validation: ValidationSection,
  limits: LimitsSection,
  cors: CorsSection,
};

const currentComponent = computed(() => {
  return componentMap[props.docsId];
});
</script>

<template>
  <div :class="$style.docsInfo">
    <div :class="$style.header">
      <span :class="$style.title">{{ title }} </span>
    </div>
    <div :class="$style.markdownBody">
      <component v-if="currentComponent" :is="currentComponent" />
      <div v-else class="text-grey text-center q-pa-md">Раздел в разработке...</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.docsInfo {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px var(--card-shadow);

  @media (max-width: 768px) {
    padding: 16px;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-main);
}

.markdownBody {
  margin-top: 24px;

  /* Говорим Vue: примени эти стили ко всем тегам внутри .markdownBody */
  :global {
    h1 {
      font-size: 32px; /* Укрощаем гиганта */
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 24px;
      line-height: 1.2;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-top: 32px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border-color); /* Красивая полоска как на GitHub */
      padding-bottom: 8px;
      line-height: 1.3;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 16px;
      color: var(--text-main);
    }

    ul,
    ol {
      margin-bottom: 16px;
      padding-left: 24px;
    }

    li {
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 8px;
    }

    strong {
      font-weight: 600;
      color: var(--text-main);
    }

    blockquote {
      border-left: 4px solid #1976d2; /* Синяя полоска слева */
      background-color: rgba(25, 118, 210, 0.05);
      padding: 12px 16px;
      margin: 0 0 16px 0;
      border-radius: 0 8px 8px 0;

      p {
        margin: 0;
      }
    }

    /* Базовые стили для кода (пока без подсветки) */
    code {
      font-family: 'Fira Code', 'Courier New', Courier, monospace;
      background: rgba(120, 120, 120, 0.15);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }

    pre {
      background: #1e1e1e; /* Темный фон для блоков кода */
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin-bottom: 20px;

      code {
        background: transparent;
        padding: 0;
        color: #d4d4d4; /* Светлый текст */
        font-size: 14px;
      }
    }
  }
}
</style>
