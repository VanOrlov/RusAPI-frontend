<script setup lang="ts">
interface DocItem {
  id: string;
  name: string;
}
defineProps<{
  items: DocItem[];
  selectedItemId: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();
</script>

<template>
  <aside :class="$style.sidebar">
    <QList
      padding
      :class="['rounded-borders', $style.listModified]"
    >
      <QItem
        v-for="item in items"
        :key="item.id"
        clickable
        v-ripple
        :class="[$style.resourceItem, selectedItemId === item.id && $style.activeItem]"
        @click="emit('select', item.id)"
      >
        <QItemSection avatar style="min-width: 36px">
          <QIcon name="article" size="xs" color="grey-7" /> 
        </QItemSection>
        <QItemSection>
          <QItemLabel :class="['text-weight-medium', $style.itemLabel]" :title="item.name">{{ item.name }}</QItemLabel>
        </QItemSection>
      </QItem>
    </QList>
  </aside>
</template>

<style lang="scss" module>
.sidebar {
  background-color: var(--bg-surface);
  padding: 16px;
  border: 1px solid var(--border-color);
  margin-bottom: 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  
  /* ФИКС: Ограничиваем ширину сайдбара экраном мобилки, учитывая margin 16px по бокам */
  max-width: calc(100vw - 32px); 

  @media (min-width: 768px) {
    margin-right: 0px;
    width: 280px;
    max-width: none; /* Убираем мобильный лимит на десктопе */
    padding: 24px;
    height: fit-content;
    position: sticky;
    top: 83px;
  }
}

.listModified {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
  padding: 0;
  
  /* ФИКС: Заставляем список соблюдать границы родителя */
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 768px) {
    flex-direction: column;
    overflow-x: visible;
    gap: 0;
  }
}

.resourceItem {
  border-radius: 6px;
  margin-bottom: 0;
  white-space: nowrap;
  
  /* ФИКС: Запрещаем пунктам меню сжиматься, заставляя их честно уходить в скролл */
  flex-shrink: 0;

  @media (min-width: 768px) {
    margin-bottom: 4px;
    flex-shrink: 1; /* На десктопе возвращаем обычное поведение */
  }

  &:hover {
    background-color: var(--hover-bg);
  }
}

.activeItem {
  background-color: var(--active-bg);
  color: var(--text-secondary);
}

.itemLabel {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>