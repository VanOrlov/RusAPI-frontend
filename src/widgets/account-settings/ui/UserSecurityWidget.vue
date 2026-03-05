<script setup lang="ts">
import { QInput } from 'quasar';
import { passwordRules, useChangePassword } from 'src/features/change-password';
import { resetValidation, runInputValidate } from 'src/shared/utils';
import { computed, ref } from 'vue';

const oldPassword = ref('');
const newPassword = ref('');
const newPassInputRef = ref<InstanceType<typeof QInput> | null>(null);

const { mutate, isLoading: isLoadingChangePass } = useChangePassword();

const isValid = computed(() => {
  return (
    passwordRules.every((rule) => {
      return rule(newPassword.value);
    }) && !!oldPassword.value
  );
});

const handleSubmit = () => {
  if (!oldPassword.value || newPassword.value.length < 6) return;

  try {
    mutate({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    oldPassword.value = '';
    newPassword.value = '';
  } catch {
    void 0;
  }
};
</script>

<template>
  <QCard flat bordered :class="$style.card" v-motion-slide-up-fast>
    <QCardSection :class="$style.section">
      <div :class="$style.header">
        <h2 :class="$style.title">Безопасность</h2>
        <p :class="$style.subtitle">Обновите свой пароль для защиты аккаунта.</p>
      </div>

      <div :class="$style.form">
        <div :class="$style.inputGroup">
          <label :class="$style.label">Текущий пароль</label>
          <QInput
            v-model="oldPassword"
            outlined
            dense
            type="password"
            label="Текущий пароль"
            color="secondary"
          />
        </div>
        <div :class="$style.inputGroup">
          <label :class="$style.label">Новый пароль</label>
          <QInput
            ref="newPassInputRef"
            v-model="newPassword"
            outlined
            dense
            type="password"
            label="Новый пароль"
            color="secondary"
            :rules="passwordRules"
            @blur="resetValidation(newPassInputRef)"
            @focus="runInputValidate(newPassInputRef)"
          />
        </div>
      </div>
    </QCardSection>

    <QCardActions :class="$style.cardFooter" align="right">
      <QBtn
        :disable="!isValid"
        :loading="isLoadingChangePass"
        @click="handleSubmit"
        color="secondary"
        outline
        label="Обновить пароль"
        unelevated
        no-caps
      />
    </QCardActions>
  </QCard>
</template>

<style lang="scss" module>
/* Стили абсолютно идентичны UserProfileWidget (можно вынести в общий mixin потом) */
.card {
  border-radius: 8px;
  border-color: var(--border-color);
  background-color: var(--bg-surface);
}
.section {
  padding: 24px;
}
.header {
  margin-bottom: 24px;
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
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
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
  color: var(--text-muted);
}
.cardFooter {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-page);
}
</style>
