<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SchemaFieldDto } from 'src/shared/api/dto';
import { RESOURCE_TEMPLATES } from 'src/shared/config/resource-templates';
import TemplateModal from './TemplateModal.vue';

const emit = defineEmits<{
  (e: 'apply', schema: SchemaFieldDto[]): void;
}>();

const isOpen = ref(false);
const selectedTemplateId = ref<string | null>(null);

const selectedTemplate = computed(() =>
  RESOURCE_TEMPLATES.find((t) => t.id === selectedTemplateId.value) || null,
);

const handleOpen = () => {
  if (!selectedTemplateId.value && RESOURCE_TEMPLATES.length > 0) {
    selectedTemplateId.value = RESOURCE_TEMPLATES[0]!.id;
  }
  isOpen.value = true;
};

const handleApply = () => {
  if (!selectedTemplate.value) return;
  emit('apply', selectedTemplate.value.schema);
};
</script>

<template>
  <div :class="$style.wrapper">
    <QBtn
      outline
      color="secondary"
      icon="dashboard_customize"
      label="Шаблоны"
      no-caps
      :class="$style.btn"
      @click="handleOpen"
    />

    <TemplateModal
      v-model="isOpen"
      :templates="RESOURCE_TEMPLATES"
      :selected-template="selectedTemplate"
      @select="selectedTemplateId = $event"
      @apply="handleApply"
    />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: inline-flex;
}

.btn {
  flex-shrink: 0;
}
</style>
