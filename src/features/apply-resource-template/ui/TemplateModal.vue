<script setup lang="ts">
import type { ResourceTemplate } from 'src/shared/config/resource-templates';
import TemplateList from './TemplateList.vue';
import TemplatePreview from './TemplatePreview.vue';

const props = defineProps<{
  modelValue: boolean;
  templates: ResourceTemplate[];
  selectedTemplate: ResourceTemplate | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'select', id: string): void;
  (e: 'apply'): void;
}>();

const handleClose = () => emit('update:modelValue', false);

const handleApply = () => {
  if (props.selectedTemplate) {
    emit('apply');
    handleClose();
  }
};
</script>

<template>
  <QDialog :model-value="modelValue" persistent @update:model-value="emit('update:modelValue', $event)">
    <QCard :class="$style.card">
      <QCardSection :class="[$style.header, 'row items-center']">
        <div :class="$style.title">Шаблоны схем</div>
        <QSpace />
        <QBtn icon="close" flat round dense @click="handleClose" />
      </QCardSection>

      <QCardSection :class="$style.body">
        <p :class="$style.description">
          Выберите готовый шаблон для этого эндпоинта. Мы подставим поля и типы данных, а вы
          сможете их отредактировать перед сохранением схемы.
        </p>

        <div :class="$style.grid">
          <div :class="$style.listCol">
            <TemplateList
              :templates="templates"
              :selected-id="selectedTemplate?.id ?? null"
              @select="emit('select', $event)"
            />
          </div>
          <div :class="$style.previewCol">
            <TemplatePreview :schema="selectedTemplate?.schema ?? null" />
          </div>
        </div>
      </QCardSection>

      <QCardActions align="right" :class="$style.actions">
        <QBtn flat label="Отмена" no-caps :class="$style.cancelBtn" @click="handleClose" />
        <QBtn
          unelevated
          label="Применить шаблон"
          color="secondary"
          no-caps
          icon="check"
          :disable="!selectedTemplate"
          @click="handleApply"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style lang="scss" module>
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 1px 2px var(--card-shadow);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px);
  min-width: 320px;
  max-width: 95vw;

  @media (min-width: 600px) {
    min-width: 520px;
    max-width: 640px;
  }
}

.header {
  padding: 16px;
  padding-bottom: 8px;
  flex-shrink: 0;

  @media (max-width: 599px) {
    padding: 12px;
    padding-bottom: 4px;
  }
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;

  @media (max-width: 599px) {
    font-size: 1.125rem;
  }
}

.body {
  padding: 0 16px 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 599px) {
    padding: 0 12px 12px;
  }
}

.description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0 0 12px 0;

  @media (max-width: 599px) {
    font-size: 0.8125rem;
    margin-bottom: 10px;
  }
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  flex: 1;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 20px;
  }
}

.listCol {
  flex-shrink: 0;

  @media (min-width: 600px) {
    width: 200px;
    flex: 0 0 200px;
  }
}

.previewCol {
  min-height: 0;
  flex: 1;
  overflow: hidden;

  @media (min-width: 600px) {
    min-width: 0;
  }
}

.actions {
  padding: 12px 16px;
  flex-shrink: 0;
  border-top: 1px solid var(--border-subtle);

  @media (max-width: 599px) {
    padding: 10px 12px;
  }
}

.cancelBtn {
  color: var(--text-muted) !important;
}
</style>
