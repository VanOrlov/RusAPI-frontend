<script setup lang="ts">
import { useDeleteProject } from '../model/use-delete-project';

const props = defineProps<{
  modelValue: boolean;
  projectId: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const { mutate: deleteProject, isLoading: isDeleting } = useDeleteProject();

const close = () => {
  emit('update:modelValue', false);
};

const handleDelete = () => {
  if (!props.projectId) return
  try {
    deleteProject(props.projectId);
    close();
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
        <div class="text-h6" style="font-weight: 600">Вы действительно хотите удалить проект?</div>
      </QCardSection>

      <QCardActions align="right" class="q-pa-md">
        <QBtn flat label="Отмена" color="grey-7" no-caps @click="close" />
        <QBtn
          unelevated
          label="Удалить"
          color="negative"
          no-caps
          :loading="isDeleting"
          @click="handleDelete"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
