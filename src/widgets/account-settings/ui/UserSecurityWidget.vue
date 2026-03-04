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
  <QCard flat bordered :class="$style.widgetCard">
    <QCardSection :class="$style.section">
      <div :class="$style.header">
        <h2 :class="$style.title">Безопасность</h2>
        <p :class="$style.subtitle">Обновите свой пароль для защиты аккаунта.</p>
      </div>

      <div :class="$style.form">
        <QInput
          v-model="oldPassword"
          outlined
          type="password"
          label="Текущий пароль"
          color="secondary"
        />
        <QInput
          ref="newPassInputRef"
          v-model="newPassword"
          outlined
          type="password"
          label="Новый пароль"
          color="secondary"
          :rules="passwordRules"
          @blur="resetValidation(newPassInputRef)"
          @focus="runInputValidate(newPassInputRef)"
        />
      </div>
    </QCardSection>

    <QSeparator />

    <QCardActions :class="$style.actions" align="right">
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
.widgetCard {
  border-radius: 8px;
  border-color: #eaeaea;
  background-color: #ffffff;
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
  color: #666;
  margin: 0;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}
.actions {
  padding: 16px 24px;
  background-color: #fcfcfc;
}
</style>
