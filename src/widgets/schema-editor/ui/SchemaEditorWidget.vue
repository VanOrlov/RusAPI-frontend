<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useUpdateSchema } from 'src/features/update-schema';
import type { ResourceDto, SchemaFieldDto } from 'src/shared/api/dto';

const props = defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();

// Доступные типы данных для селекта
const typeOptions = [
  { label: 'Строка (String)', value: 'string' },
  { label: 'Число (Number)', value: 'number' },
  { label: 'Логическое (Boolean)', value: 'boolean' },
  { label: 'Уникальный ID (UUID)', value: 'uuid' },
  { label: 'Email', value: 'email' },
];

// Локальная копия схемы (черновик, чтобы не мутировать кэш напрямую)
const localSchema = ref<SchemaFieldDto[]>([]);

// Когда юзер кликает на другой эндпоинт в сайдбаре, мы обновляем черновик
watch(
  () => props.resource,
  (newResource) => {
    // Делаем глубокую копию, чтобы избежать проблем с реактивностью
    localSchema.value = JSON.parse(JSON.stringify(newResource.schema || []));
  },
  { immediate: true, deep: true },
);

const { mutate: updateSchema, isLoading: isSaving } = useUpdateSchema();

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
  return localSchema.value.every(field => field.name && nameRegex.test(field.name));
});

const handleSave = () => {
  updateSchema({
    resourceId: props.resource.id,
    projectNanoId: props.projectNanoId,
    schema: localSchema.value,
  });
};
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.header">
      <h2 :class="$style.title">
        Схема данных: <span class="text-secondary">/{{ resource.name }}</span>
      </h2>
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
    {{ JSON.stringify(localSchema) == JSON.stringify(resource.schema)  }}

    <p class="text-grey-7 q-mb-lg">
      Опишите поля, из которых будет состоять каждый объект в этом эндпоинте.
    </p>

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
            :options="typeOptions"
            emit-value
            map-options
            outlined
            dense
            class="custom-input"
          />
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
</style>
