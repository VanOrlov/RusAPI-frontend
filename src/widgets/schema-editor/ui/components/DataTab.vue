<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGenerateData } from 'src/features/generate-data';
import type { ResourceDto } from 'src/shared/api/dto';
import type { Rule } from 'src/shared/types';
import { isRulesValid, resetValidation, runInputValidate } from 'src/shared/utils';
import { QInput } from 'quasar';

const props = defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();

const { mutate: generateData, isLoading: isGenerating } = useGenerateData();
const recordsCount = ref(10);
const recordsInputRef = ref<InstanceType<typeof QInput> | null>(null);

const recordsCountValid = computed(() => {
  return isRulesValid(recordsCountRules, `${recordsCount.value}`);
});

const handleGenerate = () => {
  if (!recordsCountValid.value) return;
  generateData({
    resourceId: props.resource.id,
    projectNanoId: props.projectNanoId,
    count: Math.round(Number(recordsCount.value)),
  });
};

const recordsCountRules: Rule[] = [
  (val: string) => Number(val) <= 100 || 'Максимум 100',
  (val: string) => Number(val) >= 1 || 'Минимум 1',
];
</script>

<template>
  <div>
    <div :class="$style.generatePanel">
      <div :class="$style.generateControls">
        <QInput
          ref="recordsInputRef"
          v-model.number="recordsCount"
          type="number"
          outlined
          dense
          label="Количество (шт)"
          style="min-width: 140px"
          :rules="recordsCountRules"
          @blur="resetValidation(recordsInputRef)"
          @focus="runInputValidate(recordsInputRef)"
        />
        <QBtn
          color="secondary"
          icon="auto_awesome"
          label="Сгенерировать"
          unelevated
          no-caps
          :loading="isGenerating"
          :disable="!recordsCountValid"
          @click="handleGenerate"
          style="height: 40px"
        />
      </div>
      <p class="text-caption text-grey-6 q-ma-none">Внимание: Текущие данные будут перезаписаны!</p>
    </div>

    <div :class="$style.jsonViewer">
      <pre v-if="resource.data && resource.data.length > 0">{{
        JSON.stringify(resource.data, null, 2)
      }}</pre>
      <div v-else class="text-center text-grey-5 q-pa-xl">
        <QIcon name="data_array" size="48px" class="q-mb-sm" />
        <div>Данные еще не сгенерированы</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.generatePanel {
  display: flex;
  flex-direction: column; /* Мобилка: Текст-предупреждение падает вниз */
  align-items: flex-start;
  gap: 12px;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #eaeaea;

  @media (min-width: 768px) {
    flex-direction: row; /* Десктоп */
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
}

.generateControls {
  display: flex;
  flex-direction: column; /* Мобилка: Инпут и кнопка друг под другом */
  width: 100%;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row; /* Десктоп */
    width: auto;
    gap: 16px;
    align-items: flex-start;
  }
}

.jsonViewer {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;

  pre {
    margin: 0;
    color: #d4d4d4;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
  }
}
</style>
