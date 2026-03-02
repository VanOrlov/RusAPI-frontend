<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCreateResource } from 'src/features/create-resource';

const props = defineProps<{
  modelValue: boolean;
  projectNanoId: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const { mutate: createEndpoint, isLoading: isCreating } = useCreateResource();
const newResourceName = ref('');

// Очищаем инпут каждый раз, когда модалка открывается
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) newResourceName.value = '';
  },
);

const close = () => {
  emit('update:modelValue', false);
};

const handleCreate = () => {
  const isValid = /^[a-zA-Z0-9_-]+$/.test(newResourceName.value);
  if (!isValid) return;

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
          :rules="[
            (val) => !!val || 'Обязательное поле',
            (val) => /^[a-zA-Z0-9_-]+$/.test(val) || 'Только латиница, цифры, - и _',
          ]"
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
          :disable="!newResourceName || !/^[a-zA-Z0-9_-]+$/.test(newResourceName)"
          @click="handleCreate"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
