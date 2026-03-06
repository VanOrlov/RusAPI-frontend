<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';

type ThemeSetting = 'light' | 'dark' | 'auto';
const currentTheme = ref<ThemeSetting>('auto');
const $q = useQuasar();

// Динамическая иконка на кнопке
const themeIcon = computed(() => {
  if (currentTheme.value === 'light') return 'light_mode';
  if (currentTheme.value === 'dark') return 'dark_mode';
  return 'brightness_auto';
});

// Функция переключения
const setTheme = (theme: ThemeSetting) => {
  currentTheme.value = theme;
  $q.localStorage.set('app_theme', theme); // Сохраняем выбор навсегда

  if (theme === 'auto') {
    $q.dark.set('auto');
  } else {
    $q.dark.set(theme === 'dark');
  }
};

// При загрузке страницы проверяем LocalStorage
onMounted(() => {
  const savedTheme = $q.localStorage.getItem('app_theme') as ThemeSetting | null;
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('auto'); // Системная по умолчанию
  }
});
</script>

<template>
  <QBtn flat round dense :icon="themeIcon" color="grey-6" class="q-mr-xs">
    <QMenu auto-close transition-show="jump-down" transition-hide="jump-up" :offset="[0, 10]">
      <QList style="min-width: 150px" class="q-py-sm">
        <QItem
          clickable
          @click="setTheme('light')"
          :active="currentTheme === 'light'"
          active-class="text-secondary"
          :class="$style.menuItem"
        >
          <QItemSection avatar style="min-width: 36px">
            <QIcon name="light_mode" size="sm" />
          </QItemSection>
          <QItemSection class="text-weight-medium">Светлая</QItemSection>
        </QItem>

        <QItem
          clickable
          @click="setTheme('dark')"
          :active="currentTheme === 'dark'"
          active-class="text-secondary"
          :class="$style.menuItem"
        >
          <QItemSection avatar style="min-width: 36px">
            <QIcon name="dark_mode" size="sm" />
          </QItemSection>
          <QItemSection class="text-weight-medium">Темная</QItemSection>
        </QItem>

        <QItem
          clickable
          @click="setTheme('auto')"
          :active="currentTheme === 'auto'"
          active-class="text-secondary"
          :class="$style.menuItem"
        >
          <QItemSection avatar style="min-width: 36px">
            <QIcon name="brightness_auto" size="sm" />
          </QItemSection>
          <QItemSection class="text-weight-medium">Системная</QItemSection>
        </QItem>
      </QList>
    </QMenu>
  </QBtn>
</template>

<style lang="scss" module>
.menuItem {
  border-radius: 6px;
  margin: 2px 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--hover-bg);
  }
}
</style>
