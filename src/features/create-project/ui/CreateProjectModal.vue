<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCreateProject } from 'src/features/create-project';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const { mutate: create, isLoading: isCreating } = useCreateProject();

const newProjectName = ref('');
const newProjectDesc = ref('');

// Очищаем форму при открытии
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      newProjectName.value = '';
      newProjectDesc.value = '';
    }
  },
);

const close = () => {
  emit('update:modelValue', false);
};

const handleCreate = () => {
  if (!newProjectName.value) return;

  try {
    create(
      { name: newProjectName.value, description: newProjectDesc.value || '' }
    );

    close()
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <QDialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    persistent
  >
    <QCard style="width: 100%; max-width: 400px; border-radius: 8px">
      <QCardSection class="row items-center q-pb-none">
        <div class="text-h6" style="font-weight: 600">Создать проект</div>
        <QSpace />
        <QBtn icon="close" flat round dense @click="close" />
      </QCardSection>

      <QCardSection class="q-pt-md">
        <div class="flex column q-mb-md" style="gap: 6px">
          <label class="text-subtitle2 text-weight-bold"
            >Название проекта <span class="text-negative">*</span></label
          >
          <QInput
            v-model="newProjectName"
            outlined
            dense
            color="secondary"
            placeholder="Например: Мой блог"
            autofocus
          />
        </div>

        <div class="flex column" style="gap: 6px">
          <label class="text-subtitle2 text-weight-bold">Описание (необязательно)</label>
          <QInput
            v-model="newProjectDesc"
            outlined
            dense
            color="secondary"
            placeholder="Коротко о том, зачем этот API"
          />
        </div>
      </QCardSection>

      <QCardActions align="right" class="q-pa-md">
        <QBtn flat label="Отмена" color="grey-7" no-caps @click="close" />
        <QBtn
          unelevated
          label="Создать"
          color="secondary"
          no-caps
          :loading="isCreating"
          :disable="!newProjectName"
          @click="handleCreate"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
