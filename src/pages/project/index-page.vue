<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectQuery } from 'src/entities/project/model/project.query';
import { useResourcesQuery } from 'src/entities/resource/model/resources.query';
import { useCreateResource } from 'src/features/create-resource';

const route = useRoute();
const projectId = route.params.id as string;

const { data: project, isLoading: isProjectLoading } = useProjectQuery(projectId);

const { data: resources, isLoading: isResourcesLoading } = useResourcesQuery(projectId);

const { mutate: createEndpoint, isLoading: isCreating } = useCreateResource();

const isModalOpen = ref(false);
const newResourceName = ref('');

const openModal = () => {
  newResourceName.value = '';
  isModalOpen.value = true;
};

const handleCreate = () => {
  const isValid = /^[a-zA-Z0-9_-]+$/.test(newResourceName.value);
  if (!isValid) return;

  try {
    createEndpoint({
      name: newResourceName.value,
      projectNanoId: projectId,
    });
    isModalOpen.value = false;
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div :class="$style.pageWrapper">
    <div v-if="isProjectLoading" :class="$style.loader">
      <QSpinner color="secondary" size="3em" />
    </div>

    <div v-else-if="project" :class="$style.workspace">
      <aside :class="$style.sidebar">
        <span :class="$style.sidebarTitle">{{ project.name }}</span>
        <div :class="$style.nanoId">ID: {{ project.nanoId }}</div>

        <QSeparator class="q-my-md" />

        <div class="flex justify-between items-center q-mb-sm">
          <p class="text-grey-6 text-caption q-ma-none">Эндпоинты</p>
          <QBtn flat round size="sm" color="secondary" icon="add" @click="openModal" />
        </div>

        <div v-if="isResourcesLoading" class="text-center q-pa-md">
          <QSpinner color="secondary" size="1.5em" />
        </div>

        <QList v-else-if="resources && resources.length > 0" padding class="rounded-borders">
          <QItem
            v-for="res in resources"
            :key="res.id"
            clickable
            v-ripple
            :class="$style.resourceItem"
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

      <main :class="$style.mainContent">
        <div :class="$style.contentHeader">
          <span class="text-h5 q-ma-none">Выберите эндпоинт</span>
        </div>
      </main>
    </div>

    <div v-else :class="$style.error">
      <h2>Проект не найден</h2>
    </div>

    <QDialog v-model="isModalOpen" persistent>
      <QCard style="min-width: 350px; border-radius: 8px">
        <QCardSection class="row items-center q-pb-none">
          <div class="text-h6" style="font-weight: 600">Новый эндпоинт</div>
          <QSpace />
          <QBtn icon="close" flat round dense v-close-popup />
        </QCardSection>

        <QCardSection class="q-pt-md">
          <div class="text-caption text-grey-7 q-mb-sm">
            Введите имя пути. Например: <strong>users</strong>, <strong>posts</strong>
          </div>
          <QInput
            v-model="newResourceName"
            outlined
            dense
            color="secondary"
            prefix="/"
            autofocus
            :rules="[
              (val) => !!val || 'Обязательное поле',
              (val) => /^[a-zA-Z0-9_-]+$/.test(val) || 'Только латиница, цифры, - и _',
            ]"
          />
        </QCardSection>

        <QCardActions align="right" class="q-pa-md">
          <QBtn flat label="Отмена" color="grey-7" no-caps v-close-popup />
          <QBtn
            unelevated
            label="Создать"
            color="secondary"
            no-caps
            :loading="isCreating"
            :disable="!newResourceName || !/^[a-zA-Z0-9_-]+$/.test(newResourceName)"
            @click="handleCreate"
          />
        </QCardActions>
      </QCard>
    </QDialog>
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
  height: calc(100vh); /* Вычитаем высоту шапки */
}

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

.mainContent {
  flex-grow: 1;
  padding: 32px;
}

.contentHeader {
  margin-bottom: 24px;
}

.loader,
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
