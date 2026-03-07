<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useCreateResource } from 'src/features/create-resource';
import type { Rule } from 'src/shared/types';
import { isRulesValid } from 'src/shared/utils';
import type { ResourceDto } from 'src/shared/api/dto';

const props = defineProps<{
  modelValue: boolean;
  projectNanoId: string;
  resources: ResourceDto[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const { mutate: createEndpoint, isLoading: isCreating } = useCreateResource();
const newResourceName = ref('');

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) newResourceName.value = '';
  },
);

const close = () => {
  emit('update:modelValue', false);
};

const resourceNameRules: Rule[] = [
  (val) => !!val || 'Обязательное поле',
  (val) => /^[a-zA-Z0-9_-]+$/.test(val) || 'Только латиница, цифры, - и _',
  (val) => val.length < 21 || 'Максимум 20 символов',
  (val) => !props.resources.map(el => el.name).includes(val) || 'Эндпоинт с таким именем уже существует',
];

const isValid = computed(() => isRulesValid(resourceNameRules, newResourceName.value))

const handleCreate = () => {
  if (!isValid.value) return;

  try {
    createEndpoint({
      name: newResourceName.value,
      projectNanoId: props.projectNanoId,
    });
    close();
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <QDialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    persistent
  >
    <QCard style="min-width: 350px; border-radius: 8px">
      <QCardSection class="row items-center q-pb-none">
        <div class="text-h6" style="font-weight: 600">Новый эндпоинт</div>
        <QSpace />
        <QBtn icon="close" flat round dense @click="close" />
      </QCardSection>

      <QCardSection class="q-pt-md">
        <div class="text-caption text-grey-7 q-mb-sm">
          Введите имя пути. Например: <strong>users</strong>, <strong>posts</strong>
        </div>
        <QInput
          v-model="newResourceName"
          outlined
          dense
          color="secondary"
          prefix="/"
          autofocus
          :rules="resourceNameRules"
        />
      </QCardSection>

      <QCardActions align="right" class="q-pa-md">
        <QBtn flat label="Отмена" color="grey-7" no-caps @click="close" />
        <QBtn
          unelevated
          label="Создать"
          color="secondary"
          no-caps
          :loading="isCreating"
          :disable="!isValid"
          @click="handleCreate"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
