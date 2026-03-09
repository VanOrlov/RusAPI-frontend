<script setup lang="ts">
import { ref } from 'vue';
import type { ResourceDto } from 'src/shared/api/dto';
import SchemaTab from './components/SchemaTab.vue';
import DataTab from './components/DataTab.vue';
import { copyText } from 'src/shared/lib/copy-to-clipboard';

const props = defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();
const resourcePathForRequest = ref(
  `${window.location.origin}/api/mock/${props.projectNanoId}/${props.resource.name}`,
);

const activeTab = ref('schema');
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.header">
      <span :class="$style.title">
        Эндпоинт:
        <span
          :class="$style.textSecondary"
          @click="copyText(resourcePathForRequest, 'Эндпоинт успешно скопирован')"
          >/{{ resource.name }} <QIcon name="content_copy" size="12px" :class="$style.copyIcon"
        /></span>
      </span>

      <a :href="`https://fakerjs.dev/api`" target="_blank" :class="$style.publicLink">
        <QIcon name="open_in_new" size="10px" />
        Открыть Faker.js API
      </a>
    </div>

    <QTabs
      v-model="activeTab"
      dense
      class="text-grey q-mt-md"
      active-color="secondary"
      indicator-color="secondary"
      outside-arrows
      no-caps
      align="left"
    >
      <QTab name="schema" label="Схема" icon="account_tree" />
      <QTab name="data" label="Данные" icon="data_object" />
    </QTabs>

    <QSeparator class="q-mb-md" />

    <QTabPanels v-model="activeTab" animated class="bg-transparent">
      <QTabPanel name="schema" class="q-pa-none">
        <SchemaTab :resource="resource" :project-nano-id="projectNanoId" />
      </QTabPanel>

      <QTabPanel name="data" class="q-pa-none">
        <DataTab :resource="resource" :project-nano-id="projectNanoId" />
      </QTabPanel>
    </QTabPanels>
  </div>
</template>

<style lang="scss" module>
.editor {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 32px;
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
.textSecondary {
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: rgba(38, 166, 154, 0.7);
  }
}

.publicLink {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 6px 12px;
  background: rgba(38, 166, 154, 0.1);
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: rgba(38, 166, 154, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 6px;
  }
}
</style>
