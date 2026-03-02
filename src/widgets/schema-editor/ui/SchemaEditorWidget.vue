<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useUpdateSchema } from 'src/features/update-schema';
import type { ResourceDto, SchemaFieldDto } from 'src/shared/api/dto';
import { FAKER_OPTIONS } from 'src/shared/config/faker-options';
import { useGenerateData } from 'src/features/generate-data';

const props = defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();

const { mutate: generateData, isLoading: isGenerating } = useGenerateData();
const { mutate: updateSchema, isLoading: isSaving } = useUpdateSchema();

const filteredOptions = ref(FAKER_OPTIONS);

const activeTab = ref('schema');
const recordsCount = ref(10);

// Локальная копия схемы (черновик, чтобы не мутировать кэш напрямую)
const localSchema = ref<SchemaFieldDto[]>([]);

const addField = () => {
  localSchema.value.push({ name: '', type: 'string' });
};

const removeField = (index: number) => {
  localSchema.value.splice(index, 1);
};

const isDirty = computed(() => {
  // Используем JSON.stringify для быстрого и надежного сравнения массивов
  const original = JSON.stringify(props.resource.schema || []);
  const current = JSON.stringify(localSchema.value);
  return original !== current;
});

const isValid = computed(() => {
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  // Проходимся по каждому полю: имя не должно быть пустым и должно подходить под регулярку
  return localSchema.value.every((field) => field.name && nameRegex.test(field.name));
});

const handleSave = () => {
  updateSchema({
    resourceId: props.resource.id,
    projectNanoId: props.projectNanoId,
    schema: localSchema.value,
  });
};

const handleGenerate = () => {
  generateData({
    resourceId: props.resource.id,
    projectNanoId: props.projectNanoId,
    count: recordsCount.value,
  });
};

const filterFn = (val: string, update: (fn: () => void) => void) => {
  if (val === '') {
    update(() => {
      filteredOptions.value = FAKER_OPTIONS;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredOptions.value = FAKER_OPTIONS.filter(
      (v) =>
        v.label.toLowerCase().indexOf(needle) > -1 || v.value.toLowerCase().indexOf(needle) > -1,
    );
  });
};

// Когда юзер кликает на другой эндпоинт в сайдбаре, мы обновляем черновик
watch(
  () => props.resource,
  (newResource) => {
    // Делаем глубокую копию, чтобы избежать проблем с реактивностью
    localSchema.value = JSON.parse(JSON.stringify(newResource.schema || []));
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.header">
      <h2 :class="$style.title">
        Эндпоинт: <span class="text-secondary">/{{ resource.name }}</span>
      </h2>

      <a
        :href="`https://fakerjs.dev/api`"
        target="_blank"
        :class="$style.publicLink"
      >
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
      narrow-indicator
    >
      <QTab name="schema" label="Конструктор схемы" icon="account_tree" />
      <QTab name="data" label="Сгенерированные данные" icon="data_object" />
    </QTabs>

    <QSeparator class="q-mb-md" />

    <QTabPanels v-model="activeTab" animated class="bg-transparent">
      <QTabPanel name="schema" class="q-pa-none">
        <div class="flex justify-between items-center q-mb-md">
          <p class="text-grey-7 q-ma-none">
            Опишите поля, из которых будет состоять каждый объект в этом эндпоинте.
          </p>
          <QBtn
            color="secondary"
            label="Сохранить схему"
            unelevated
            no-caps
            icon="save"
            :loading="isSaving"
            :disable="!isDirty || !isValid"
            @click="handleSave"
          />
        </div>

        <div :class="$style.fieldsList">
          <div v-for="(field, index) in localSchema" :key="index" :class="$style.fieldRow">
            <div :class="$style.inputWrapper">
              <label class="text-caption text-weight-bold text-grey-8">Имя поля</label>
              <QInput
                v-model="field.name"
                outlined
                dense
                placeholder="Например: id, email, price"
                class="custom-input"
                :rules="[(val) => /^[a-zA-Z0-9_]+$/.test(val) || 'Только a-z, 0-9, _']"
                hide-bottom-space
              />
            </div>

            <div :class="$style.inputWrapper">
              <label class="text-caption text-weight-bold text-grey-8">Тип данных</label>
              <QSelect
                v-model="field.type"
                :options="filteredOptions"
                emit-value
                map-options
                outlined
                dense
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @filter="filterFn"
                placeholder="Выберите или начните вводить..."
                class="custom-input"
              >
                <template v-slot:option="scope">
                  <QItem v-bind="scope.itemProps">
                    <QItemSection>
                      <QItemLabel>{{ scope.opt.label }}</QItemLabel>
                      <QItemLabel caption class="text-grey-6">
                        {{ scope.opt.category }} ({{ scope.opt.value }})
                      </QItemLabel>
                    </QItemSection>
                  </QItem>
                </template>

                <template v-slot:no-option>
                  <QItem>
                    <QItemSection class="text-grey"> Генератор не найден </QItemSection>
                  </QItem>
                </template>
              </QSelect>
            </div>

            <QBtn
              flat
              round
              color="negative"
              icon="delete"
              size="sm"
              class="q-mt-md"
              @click="removeField(index)"
            />
          </div>
        </div>

        <QBtn
          outline
          color="secondary"
          icon="add"
          label="Добавить поле"
          no-caps
          class="q-mt-md"
          @click="addField"
        />
      </QTabPanel>

      <QTabPanel name="data" class="q-pa-none">
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

.fieldsList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fieldRow {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fafafa;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.inputWrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.publicLink {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #26a69a; /* Твой secondary */
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
