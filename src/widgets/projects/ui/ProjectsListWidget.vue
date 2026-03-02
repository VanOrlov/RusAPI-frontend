<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsQuery } from 'src/entities/project/model/projects.query';
import { ProjectCard } from 'src/entities/project/ui';
import { CreateProjectModal } from 'src/features/create-project/ui';

// Подключаем список проектов
const { data: projects, isLoading: isProjectsLoading } = useProjectsQuery();

// Управление модалкой
const isModalOpen = ref(false);
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

    <div v-if="isProjectsLoading" :class="$style.grid">
      <QSkeleton height="175px" v-for="i in 4" :key="i" />
    </div>

    <div v-else-if="projects && projects.length > 0" :class="$style.grid">
      <ProjectCard
        v-for="project in projects" 
        :key="project.id" 
        :project="project" 
      />
    </div>

    <div
      v-else
      :class="$style.emptyState"
    >
      <QIcon name="folder_open" size="64px" color="grey-4" />
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
  flex-direction: column; /* На мобилке элементы шапки друг под другом */
  align-items: flex-start;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row; /* На десктопе в один ряд */
    justify-content: space-between;
    align-items: flex-start;
    gap: 0;
  }
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #111;
  letter-spacing: -0.5px;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

/* Сетка карточек */
.grid {
  display: grid;
  /* auto-fill сам перенесет карточки на новую строку, если не хватает места */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
}

/* Пустое состояние */
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background-color: #ffffff;
  border: 1px dashed #d9d9d9;
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
  color: #111;

  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.emptyDesc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  max-width: 400px;
}
</style>