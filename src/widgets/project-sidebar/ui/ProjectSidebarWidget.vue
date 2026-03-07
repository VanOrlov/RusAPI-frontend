<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { ProjectDto, ResourceDto } from 'src/shared/api/dto';
import { copyText } from 'src/shared/lib/copy-to-clipboard';

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

const router = useRouter();
</script>

<template>
  <aside :class="$style.sidebar">
    <div :class="$style.backWrapper">
      <QBtn
        flat
        dense
        no-caps
        icon="arrow_back"
        label="Все проекты"
        :class="$style.backBtn"
        @click="router.push('/projects')"
      />
    </div>

    <span :class="$style.sidebarTitle">{{ project.name }}</span>
    <div :class="$style.nanoId">
      ID:<span @click="copyText(project.nanoId, 'ID проекта скопирован!')">{{
        project.nanoId
      }}</span>
    </div>

    <QSeparator class="q-my-md" />

    <div class="flex justify-between items-center q-mb-sm">
      <p class="text-body2 q-ma-none">Эндпоинты</p>
      <QBtn size="10px" color="secondary" icon="add" @click="emit('create')" />
    </div>

    <div v-if="isLoadingResources" class="text-center q-pa-md">
      <QSpinner color="secondary" size="1.5em" />
    </div>

    <QList
      v-else-if="resources && resources.length > 0"
      padding
      :class="['rounded-borders', $style.listModified]"
    >
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
  background-color: var(--bg-surface);
  padding: 16px;
  border: 1px solid var(--border-color);
  margin: 16px;
  margin-bottom: 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-right: 0px;
    width: 280px;
    padding: 24px;
    height: fit-content;
    position: sticky;
    top: 73px;
  }
}

.backWrapper {
  margin-bottom: 16px;
}

.backBtn {
  font-weight: 500;
  font-size: 13px;
  margin-left: -8px; 
  transition: color 0.2s;
  color: var(--text-muted);
}
.listModified {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
  padding: 8px 0;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 768px) {
    flex-direction: column;
    overflow-x: visible;
    gap: 0;
  }
}

.sidebarTitle {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-main);
}

.nanoId {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;

  span {
    font-family: monospace;
    margin-left: 5px;
    color: var(--text-muted);
    background: var(--bg-surface-elevated);
    padding: 2px 6px;
    border-radius: 4px;
    width: fit-content;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;

    &:hover {
      background: var(--hover-bg);
      color: var(--text-main);
    }
  }
}

.resourceItem {
  border-radius: 6px;
  margin-bottom: 0;
  white-space: nowrap;

  @media (min-width: 768px) {
    margin-bottom: 4px;
  }

  &:hover {
    background-color: var(--hover-bg);
  }
}

.activeItem {
  background-color: var(--active-bg);
  color: var(--text-secondary);
}
</style>
