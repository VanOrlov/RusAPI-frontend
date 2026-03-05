<script setup lang="ts">
// TODO: логика удаления аккаунта
</script>

<template>
  <QCard flat bordered :class="[$style.card, $style.dangerCard]" v-motion-slide-up-fast>
    <QCardSection :class="$style.section">
      <div :class="$style.header">
        <h2 :class="[$style.title, $style.textDanger]">Удаление аккаунта</h2>
        <p :class="$style.subtitle">
          Навсегда удалить аккаунт и все связанные проекты (API). Это действие невозможно отменить.
        </p>
      </div>
    </QCardSection>

    <QCardActions align="right" :class="[$style.actions, $style.dangerActions]">
      <QBtn color="negative" label="Удалить аккаунт" unelevated no-caps disable title="Функция недоступна"/>
    </QCardActions>
  </QCard>
</template>

<style lang="scss" module>
.card {
  border-radius: 8px;
  background-color: var(--bg-surface);
}
.section {
  padding: 24px;
}
.header {
  margin-bottom: 0;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.2;
}
.subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.actions {
  padding: 16px 24px;
}

/* Специфичные стили опасной зоны */
.dangerCard {
  border-color: var(--danger-border);
}
.textDanger {
  color: var(--danger-text);
}
.dangerActions {
  background-color: var(--bg-page);
  border-top: 1px solid var(--danger-border)
}
</style>
