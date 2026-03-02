<script setup lang="ts">
import type { ProjectDto, ResourceDto } from 'src/shared/api/dto';

defineProps<{
  project: ProjectDto;
  resources: ResourceDto[] | undefined;
  isLoadingResources: boolean;
  selectedResourceId: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'create'): void;
}>();
</script>

<template>
  <aside :class="$style.sidebar">
    <span :class="$style.sidebarTitle">{{ project.name }}</span>
    <div :class="$style.nanoId">ID: {{ project.nanoId }}</div>

    <QSeparator class="q-my-md" />

    <div class="flex justify-between items-center q-mb-sm">
      <p class="text-grey-6 text-caption q-ma-none">Эндпоинты</p>
      <QBtn flat round size="sm" color="secondary" icon="add" @click="emit('create')" />
    </div>

    <div v-if="isLoadingResources" class="text-center q-pa-md">
      <QSpinner color="secondary" size="1.5em" />
    </div>

    <QList v-else-if="resources && resources.length > 0" padding class="rounded-borders">
      <QItem
        v-for="res in resources"
        :key="res.id"
        clickable
        v-ripple
        :class="[$style.resourceItem, selectedResourceId === res.id && $style.activeItem]"
        @click="emit('select', res.id)"
      >
        <QItemSection avatar style="min-width: 36px">
          <QIcon name="api" size="xs" color="grey-7" />
        </QItemSection>
        <QItemSection>
          <QItemLabel class="text-weight-medium">/{{ res.name }}</QItemLabel>
        </QItemSection>
      </QItem>
    </QList>

    <div v-else class="text-grey-5 text-caption text-center q-mt-md">
      Пусто. Создайте первый эндпоинт.
    </div>
  </aside>
</template>

<style lang="scss" module>
.sidebar {
  width: 280px;
  background-color: #fafafa;
  border-right: 1px solid #eaeaea;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.sidebarTitle {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #111;
}

.nanoId {
  font-family: monospace;
  font-size: 12px;
  color: #666;
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
}

.resourceItem {
  border-radius: 6px;
  margin-bottom: 4px;
  &:hover {
    background-color: #f0f8f7;
  }
}

.activeItem {
  background-color: #e0f2f1; /* Легкий зеленый для активного элемента */
  color: #26a69a;
}
</style>