<script setup lang="ts">
import { ref } from 'vue';

const user = ref({
  name: 'Иван Иванов',
  email: 'ivan.ivanov@example.com',
});
</script>

<template>
  <QCard flat :class="$style.card">
    <QCardSection :class="$style.cardBody">
      <div :class="$style.header">
        <h2 :class="$style.title">Профиль</h2>
        <p :class="$style.subtitle">
          Ваше имя и публичная информация, которая будет видна в проектах.
        </p>
      </div>

      <div :class="$style.inputGroup">
        <label :class="$style.label">Ваше имя</label>
        <QInput v-model="user.name" outlined dense color="secondary" class="custom-input" />
      </div>

      <div :class="$style.inputGroup">
        <label :class="$style.label">Email</label>
        <QInput v-model="user.email" outlined dense disable readonly class="custom-input" />
        <span :class="$style.hint"
          >Мы используем этот email для важных уведомлений. Для смены адреса обратитесь в
          поддержку.</span
        >
      </div>
    </QCardSection>

    <QCardActions :class="$style.cardFooter">
      <span :class="$style.footerNote">Пожалуйста, используйте максимум 32 символа.</span>
      <QBtn color="secondary" label="Сохранить" unelevated no-caps />
    </QCardActions>
  </QCard>
</template>

<style lang="scss" module>
.card {
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03); /* Очень легкая тень */
}

.cardBody {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px; /* Ровные отступы между блоками */
}

.header {
  margin-bottom: 4px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.avatarSection {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  font-weight: 600;
  font-size: 24px;
}

.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.hint {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
  line-height: 1.4;
}

.cardFooter {
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footerNote {
  font-size: 14px;
  color: #666;
}

/* Адаптив для телефона */
@media (max-width: 600px) {
  .cardBody {
    padding: 20px;
  }
  .cardFooter {
    padding: 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>

<style>
/* Глобально сбрасываем Quasar стили, чтобы инпуты стали строже */
.custom-input .q-field__control {
  border-radius: 6px;
}
</style>