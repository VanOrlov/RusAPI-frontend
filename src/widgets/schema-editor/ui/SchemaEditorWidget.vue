<script setup lang="ts">
import { ref } from 'vue';
import type { ResourceDto } from 'src/shared/api/dto';
import SchemaTab from './components/SchemaTab.vue';
import DataTab from './components/DataTab.vue';

defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();

const activeTab = ref('schema');
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.header">
      <h2 :class="$style.title">
        Эндпоинт: <span class="text-secondary">/{{ resource.name }}</span>
      </h2>

      <a :href="`https://fakerjs.dev/api`" target="_blank" :class="$style.publicLink">
        <QIcon name="open_in_new" size="xs" />
        Открыть GET API
      </a>
    </div>

    <QTabs
      v-model="activeTab"
      dense
      class="text-grey q-mt-md"
      active-color="secondary"
      indicator-color="secondary"
      align="left"
    >
      <QTab name="schema" label="Конструктор схемы" icon="account_tree" />
      <QTab name="data" label="Сгенерированные данные" icon="data_object" />
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
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
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
  color: #111;
}

.publicLink {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #26a69a;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 12px;
  background: rgba(38, 166, 154, 0.1);
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: rgba(38, 166, 154, 0.2);
  }
}
</style>
