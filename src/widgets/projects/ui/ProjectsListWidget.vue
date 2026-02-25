<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsQuery } from 'src/entities/project/model/projects.query';
import { useCreateProject } from 'src/features/create-project';

// 1. Подключаем список проектов
const { data: projects, isLoading: isProjectsLoading } = useProjectsQuery();

// 2. Подключаем мутацию создания
const { mutate: create, isLoading: isCreating } = useCreateProject();

// Управление модалкой
const isModalOpen = ref(false);
const newProjectName = ref('');
const newProjectDesc = ref('');

const openModal = () => {
  newProjectName.value = '';
  newProjectDesc.value = '';
  isModalOpen.value = true;
};

const handleCreate = () => {
  if (!newProjectName.value) return;

  try {
    create({
      name: newProjectName.value,
      description: newProjectDesc.value || '',
    });

    // Закрываем модалку только в случае успеха
    isModalOpen.value = false;
  } catch (error) {
    console.error(error);
    // Ошибки уже обрабатываются внутри хука (через уведомления)
  }
};

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
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
        @click="openModal"
      />
    </div>
    <div v-if="isProjectsLoading" :class="$style.grid">
      <QSkeleton height="175px"/>
      <QSkeleton height="175px"/>
      <QSkeleton height="175px"/>
      <QSkeleton height="175px"/>
    </div>
    <div v-else-if="projects && projects.length > 0" :class="$style.grid">
      <QCard
        v-for="project in projects"
        :key="project.id"
        flat
        bordered
        :class="$style.projectCard"
      >
        <QCardSection :class="$style.cardBody">
          <div :class="$style.cardHeader">
            <h3 :class="$style.projectName">{{ project.name }}</h3>
            <QBadge color="grey-2" text-color="grey-8" :class="$style.nanoIdBadge">
              {{ project.nanoId }}
            </QBadge>
          </div>
          <p :class="$style.projectDesc">
            {{ project.description || 'Нет описания' }}
          </p>

          <div :class="$style.cardFooter">
            <div :class="$style.footerMeta">
              <QIcon name="calendar_today" size="14px" :class="$style.metaIcon" />
              <span>Создан {{ formatDate(project.createdAt) }}</span>
            </div>
            <QBtn flat round color="secondary" icon="arrow_forward" size="sm" />
          </div>
        </QCardSection>
      </QCard>
    </div>

    <div
      v-else-if="(!projects || projects.length === 0) && !isProjectsLoading"
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
        @click="openModal"
        :loading="isCreating"
      />
    </div>

    <QDialog v-model="isModalOpen" persistent>
      <QCard style="min-width: 400px; border-radius: 8px">
        <QCardSection class="row items-center q-pb-none">
          <div class="text-h6" style="font-weight: 600">Создать проект</div>
          <QSpace />
          <QBtn icon="close" flat round dense v-close-popup />
        </QCardSection>

        <QCardSection class="q-pt-md">
          <div :class="$style.inputGroup">
            <label :class="$style.label"
              >Название проекта <span class="text-negative">*</span></label
            >
            <QInput
              v-model="newProjectName"
              outlined
              dense
              color="secondary"
              placeholder="Например: Мой блог"
              autofocus
            />
          </div>

          <div :class="$style.inputGroup" style="margin-top: 16px">
            <label :class="$style.label">Описание (необязательно)</label>
            <QInput
              v-model="newProjectDesc"
              outlined
              dense
              color="secondary"
              placeholder="Коротко о том, зачем этот API"
            />
          </div>
        </QCardSection>

        <QCardActions align="right" class="q-pa-md">
          <QBtn flat label="Отмена" color="grey-7" no-caps v-close-popup />
          <QBtn
            unelevated
            label="Создать"
            color="secondary"
            no-caps
            :disable="!newProjectName"
            @click="handleCreate"
          />
        </QCardActions>
      </QCard>
    </QDialog>
  </div>
</template>

<style lang="scss" module>
.widget {
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #111;
  letter-spacing: -0.5px;
  line-height: 1;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* Сетка карточек */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.projectCard {
  border-radius: 8px;
  border-color: #eaeaea;
  background-color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #26a69a; /* Твой secondary цвет */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(38, 166, 154, 0.1);
  }
}

.cardBody {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.projectName {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #111;
  line-height: 1.3;
}

.nanoIdBadge {
  font-family: 'Courier New', Courier, monospace; /* Моноширинный шрифт для ID */
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.projectDesc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.5;
  flex-grow: 1; /* Прижимает футер к низу */
}

.cardFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eaeaea;
  padding-top: 16px;
  margin-top: auto;
}

.footerMeta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #888;
}

.metaIcon {
  color: #bbb;
}

/* Пустое состояние */
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 20px;
  background-color: #ffffff;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  text-align: center;
}

.emptyTitle {
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0 8px 0;
  color: #111;
}

.emptyDesc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  max-width: 400px;
}

/* Стили формы в модалке */
.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
</style>
