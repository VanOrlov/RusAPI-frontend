<script setup lang="ts">
import type { ResourceTemplate } from 'src/shared/config/resource-templates';

defineProps<{
  templates: ResourceTemplate[];
  selectedId: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();
</script>

<template>
  <QList :class="$style.list" bordered class="rounded-borders">
    <QItem
      v-for="template in templates"
      :key="template.id"
      clickable
      :active="selectedId === template.id"
      :active-class="$style.itemActive"
      @click="emit('select', template.id)"
    >
      <QItemSection>
        <QItemLabel :class="$style.name">
          {{ template.name }}
        </QItemLabel>
        <QItemLabel caption :class="$style.description">
          {{ template.description }}
        </QItemLabel>
      </QItemSection>
    </QItem>
  </QList>
</template>

<style lang="scss" module>
.list {
  border-color: var(--border-color) !important;
  max-height: 320px;
  overflow-y: auto;

  @media (max-width: 599px) {
    max-height: 200px;
  }
}

.itemActive {
  background: var(--active-bg) !important;
}

.name {
  color: var(--text-main);
  font-weight: 500;
}

.description {
  color: var(--text-muted) !important;
}
</style>
