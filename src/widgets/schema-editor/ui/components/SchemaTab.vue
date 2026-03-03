<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useUpdateSchema } from 'src/features/update-schema';
import type { ResourceDto, SchemaFieldDto } from 'src/shared/api/dto';
import { FAKER_OPTIONS } from 'src/shared/config/faker-options';

const props = defineProps<{
  resource: ResourceDto;
  projectNanoId: string;
}>();

const { mutate: updateSchema, isLoading: isSaving } = useUpdateSchema();

const filteredOptions = ref(FAKER_OPTIONS);
const localSchema = ref<SchemaFieldDto[]>([]);

const addField = () => {
  localSchema.value.push({ name: '', type: 'string' });
};

const removeField = (index: number) => {
  localSchema.value.splice(index, 1);
};

const isDirty = computed(() => {
  const original = JSON.stringify(props.resource.schema || []);
  const current = JSON.stringify(localSchema.value);
  return original !== current;
});

const isValid = computed(() => {
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  return localSchema.value.every((field) => field.name && nameRegex.test(field.name));
});

const handleSave = () => {
  updateSchema({
    resourceId: props.resource.id,
    projectNanoId: props.projectNanoId,
    schema: localSchema.value,
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

watch(
  () => props.resource,
  (newResource) => {
    localSchema.value = JSON.parse(JSON.stringify(newResource.schema || []));
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div>
    <div class="flex justify-between items-center q-mb-md">
      <p class="text-grey-7 q-ma-none">
        Опишите поля, из которых будет состоять каждый объект в этом эндпоинте.
      </p>
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
          :class="$style.deleteBtn"
          @click="removeField(index)"
        />
      </div>
    </div>

    <div :class="$style.btnsContainer">
      <QBtn
        outline
        color="secondary"
        icon="add"
        label="Добавить поле"
        no-caps
        @click="addField"
      />
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
  </div>
</template>

<style lang="scss" module>
.fieldsList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fieldRow {
  display: flex;
  flex-direction: column; /* На мобилке элементы друг под другом */
  align-items: flex-start;
  gap: 12px;
  background: #fafafa;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  @media (min-width: 768px) {
    flex-direction: row; /* На десктопе в ряд */
    gap: 16px;
  }
}

.inputWrapper {
  width: 100%; /* На мобилке инпут занимает все 100% ширины */
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: 768px) {
    flex: 1; /* На десктопе занимает свободную часть строки */
    width: auto;
  }
}

.deleteBtn {
  align-self: flex-end; /* На мобилке кнопка корзины прижата к правому краю */

  @media (min-width: 768px) {
    align-self: center; /* На десктопе выровнена по центру строки */
    margin-top: 20px;
  }
}

.btnsContainer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px
}
</style>
