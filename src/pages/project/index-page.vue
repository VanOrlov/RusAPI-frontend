<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectQuery } from 'src/entities/project/model/project.query';
import { useResourcesQuery } from 'src/entities/resource/model/resources.query';
import { SchemaEditorWidget } from 'src/widgets/schema-editor/ui';
import { ProjectSidebarWidget } from 'src/widgets/project-sidebar/ui';
import { CreateResourceModal } from 'src/features/create-resource';

const route = useRoute();
const projectId = route.params.id as string;

// Запросы данных
const { data: project, isLoading: isProjectLoading } = useProjectQuery(projectId);
const { data: resources, isLoading: isResourcesLoading } = useResourcesQuery(projectId);

// Состояние интерфейса
const selectedResourceId = ref<string | null>(null);
const isModalOpen = ref(false);

// Вычисляем выбранный эндпоинт
const selectedResource = computed(() => {
  if (!resources.value || !selectedResourceId.value) return null;
  return resources.value.find((r) => r.id === selectedResourceId.value) || null;
});
</script>

<template>
  <div :class="$style.pageWrapper">
    <div v-if="isProjectLoading" :class="$style.loader">
      <QSpinner color="secondary" size="3em" />
    </div>

    <div v-else-if="project" :class="$style.workspace">
      <ProjectSidebarWidget
        :project="project"
        :resources="resources"
        :is-loading-resources="isResourcesLoading"
        :selected-resource-id="selectedResourceId"
        @select="selectedResourceId = $event"
        @create="isModalOpen = true"
      />

      <main :class="$style.mainContent">
        <SchemaEditorWidget
          v-if="selectedResource"
          :resource="selectedResource"
          :project-nano-id="projectId"
        />

        <div v-else class="text-center q-mt-xl">
          <QIcon name="touch_app" size="64px" color="grey-4" />
          <h3 class="text-h6 text-grey-8 q-mt-md">Выберите эндпоинт</h3>
          <p class="text-grey-6">Чтобы настроить его схему данных</p>
        </div>
      </main>
    </div>

    <div v-else :class="$style.error">
      <h2>Проект не найден</h2>
    </div>

    <CreateResourceModal v-model="isModalOpen" :project-nano-id="projectId" />
  </div>
</template>

<style lang="scss" module>
.pageWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workspace {
  display: flex;
  flex-grow: 1;
  flex-direction: column; 

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.mainContent {
  flex-grow: 1;
  padding: 16px;
}

.loader,
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
