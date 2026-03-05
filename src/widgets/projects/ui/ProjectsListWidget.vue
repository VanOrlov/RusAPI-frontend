<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProjectsQuery } from 'src/entities/project/model/projects.query';
import { ProjectCard } from 'src/entities/project/ui';
import { CreateProjectModal } from 'src/features/create-project/ui';

const { data: projects, isLoading: isProjectsLoading = true } = useProjectsQuery();

const isModalOpen = ref(false);

const sortedProjects = computed(() => {
  if (!projects.value) return [];

  // Создаем копию и сразу сортируем
  return [...projects.value].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
});
</script>

<template>
  <div :class="$style.widget">
    <div :class="$style.header">
      <div>
        <h1 :class="$style.title">Мои проекты</h1>
        <p :class="$style.subtitle">Управляйте вашими мок-API и ресурсами.</p>
      </div>
      <QBtn
        color="secondary"
        icon="add"
        label="Новый проект"
        unelevated
        no-caps
        @click="isModalOpen = true"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="isProjectsLoading || projects === undefined" :class="$style.grid">
        <QSkeleton height="175px" animation="blink" v-for="i in 4" :key="i" />
      </div>

      <div v-else-if="projects && projects.length > 0" :class="$style.grid">
        <ProjectCard
          v-for="project in sortedProjects"
          :key="project.id"
          :project="project"
          v-motion-slide-up-fast
        />
      </div>

      <div v-else-if="!isProjectsLoading && !projects?.length" :class="$style.emptyState">
        <QIcon name="folder_open" size="64px" color="grey-6" />
        <h3 :class="$style.emptyTitle">У вас пока нет проектов</h3>
        <p :class="$style.emptyDesc">Создайте свой первый проект, чтобы начать генерировать API.</p>
        <QBtn
          color="secondary"
          outline
          label="Создать проект"
          no-caps
          @click="isModalOpen = true"
        />
      </div>
    </Transition>

    <CreateProjectModal v-model="isModalOpen" />
  </div>
</template>

<style lang="scss" module>
.widget {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  @media (min-width: 768px) {
    gap: 32px;
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0;
  }
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

.subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
}

.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background-color: var(--bg-surface);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 64px 20px;
  }
}

.emptyTitle {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0 8px 0;
  color: var(--text-main);

  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.emptyDesc {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0 0 24px 0;
  max-width: 400px;
}

:global {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
