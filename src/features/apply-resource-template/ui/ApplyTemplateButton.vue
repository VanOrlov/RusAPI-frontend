<script setup lang="ts">
import type { SchemaFieldDto } from 'src/shared/api/dto';
import { RESOURCE_TEMPLATES } from 'src/shared/config/resource-templates';

const emit = defineEmits<{
  (e: 'apply', schema: SchemaFieldDto[]): void;
}>();

const handleSelect = (schema: SchemaFieldDto[]) => {
  emit('apply', schema);
};
</script>

<template>
  <QBtn
    outline
    color="secondary"
    icon="dashboard_customize"
    label="Шаблоны"
    no-caps
    :class="$style.btn"
  >
    <QMenu auto-close :offset="[0, 8]" :class="$style.menu">
      <QList style="min-width: 220px">
        <QItem
          v-for="template in RESOURCE_TEMPLATES"
          :key="template.id"
          v-close-popup
          clickable
          @click="handleSelect(template.schema)"
        >
          <QItemSection>
            <QItemLabel>{{ template.name }}</QItemLabel>
            <QItemLabel caption class="text-grey-6">
              {{ template.description }}
            </QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </QMenu>
  </QBtn>
</template>

<style lang="scss" module>
.btn {
  flex-shrink: 0;
}

.menu {
  border-radius: 8px;
}
</style>
