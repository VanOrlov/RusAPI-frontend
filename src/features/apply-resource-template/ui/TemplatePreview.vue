<script setup lang="ts">
import type { SchemaFieldDto } from 'src/shared/api/dto';

defineProps<{
  schema: SchemaFieldDto[] | null;
}>();
</script>

<template>
  <div :class="$style.root">
    <div v-if="schema" :class="$style.preview">
      <div :class="$style.caption">
        Поля, которые будут подставлены в схему:
      </div>
      <div :class="$style.tableWrap">
        <QMarkupTable :class="$style.table" dense flat bordered>
          <thead>
            <tr>
              <th class="text-left">Имя поля</th>
              <th class="text-left">Тип (faker)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in schema" :key="field.name">
              <td>
                <code :class="$style.code">{{ field.name }}</code>
              </td>
              <td>
                <code :class="$style.code">{{ field.type }}</code>
              </td>
            </tr>
          </tbody>
        </QMarkupTable>
      </div>
      <div :class="$style.hint">
        После применения шаблона вы сможете изменить поля и сохранить схему как обычно.
      </div>
    </div>

    <div v-else :class="$style.placeholder">
      Выберите шаблон слева, чтобы увидеть его структуру.
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  min-height: 120px;
}

.preview {
  border-radius: 8px;
}

.caption {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.tableWrap {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -8px;
  max-height: 280px;

  @media (max-width: 599px) {
    max-height: 220px;
  }

  @media (min-width: 600px) {
    margin: 0;
  }
}

.table {
  border-color: var(--border-color) !important;
  min-width: 260px;

  th,
  td {
    color: var(--text-main);
    border-color: var(--border-subtle) !important;
    white-space: nowrap;
  }

  td:last-child {
    white-space: normal;
    word-break: break-all;
  }
}

.code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.75rem;
  background: var(--hover-bg);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-main);
}

.hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 12px;
}

.placeholder {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
