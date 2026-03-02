<script setup lang="ts">
import { ref } from 'vue';
import { useGenerateData } from 'src/features/generate-data';
import type { ResourceDto } from 'src/shared/api/dto';

const props = defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();

const { mutate: generateData, isLoading: isGenerating } = useGenerateData();
const recordsCount = ref(10);

const handleGenerate = () => {
  generateData({
    resourceId: props.resource.id,
    projectNanoId: props.projectNanoId,
    count: recordsCount.value,
  });
};
</script>

<template>
  <div>
    <div :class="$style.generatePanel">
      <div class="flex items-center" style="gap: 16px">
        <QInput
          v-model.number="recordsCount"
          type="number"
          outlined
          dense
          label="Количество (шт)"
          style="width: 140px"
          :min="1"
          :max="100"
        />
        <QBtn
          color="secondary"
          icon="auto_awesome"
          label="Сгенерировать"
          unelevated
          no-caps
          :loading="isGenerating"
          @click="handleGenerate"
        />
      </div>
      <p class="text-caption text-grey-6 q-ma-none">
        Внимание: Текущие данные будут перезаписаны!
      </p>
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
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #eaeaea;
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