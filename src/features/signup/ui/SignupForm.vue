<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { emailRules, nameRules, passwordRules } from '../model/rules';
import { useSignupStore } from '../model/store/signup.store';
import { ROUTE_NAMES } from 'src/shared/app/model';

const signupStore = useSignupStore();
const router = useRouter();

// Добавляем переменные для переключения видимости паролей
const isPwdVisible = ref(false);
const isRepeatPwdVisible = ref(false);

const onSubmit = async () => {
  const success = await signupStore.register();
  if (success) {
    await router.push({ name: ROUTE_NAMES.ACCOUNT });
  }
};
</script>

<template>
  <div :class="$style.signupContainer">
    <div :class="$style.formTitle" v-motion-slide-up-fast>Регистрация</div>
    <div :class="$style.formContainer" v-motion-slide-up>
      <QForm @submit="onSubmit">
        <QInput
          v-model="signupStore.signupData.name"
          color="secondary"
          label="Имя"
          :rules="nameRules"
        />

        <QInput
          v-model="signupStore.signupData.email"
          color="secondary"
          label="Email"
          type="email"
          :rules="emailRules"
        />

        <QInput
          v-model="signupStore.signupData.password"
          color="secondary"
          label="Пароль"
          :type="isPwdVisible ? 'text' : 'password'"
          :rules="passwordRules"
        >
          <template v-slot:append>
            <QIcon
              :name="isPwdVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdVisible = !isPwdVisible"
            />
          </template>
        </QInput>

        <QInput
          v-model="signupStore.signupData.repeatPassword"
          color="secondary"
          label="Повторите пароль"
          :type="isRepeatPwdVisible ? 'text' : 'password'"
          :rules="[(val) => val === signupStore.signupData.password || 'Пароль не совпадает']"
        >
          <template v-slot:append>
            <QIcon
              :name="isRepeatPwdVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isRepeatPwdVisible = !isRepeatPwdVisible"
            />
          </template>
        </QInput>
        <QBtn
          type="submit"
          :disable="!signupStore.isSignupDataValid"
          color="secondary"
          label="Регистрация"
          no-caps
          :class="$style.signupBtn"
        />
      </QForm>
    </div>
    <div :class="$style.formFooter" v-motion-slide-up-late>
      Есть аккаунт? <router-link to="/login" :class="$style.formFooterLink">Войти</router-link>
    </div>
  </div>
</template>

<style lang="scss" module>
.signupContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 468px;
}

.formTitle {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 30px;
  }
}

.formContainer {
  width: 100%;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--bg-surface);

  @media (max-width: 400px) {
    padding: 16px;
  }
}

.pwsInput {
  position: relative;
}

.signupBtn {
  width: 100%;
  margin-top: 15px;
}

.formFooter {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

.formFooterLink {
  margin-left: 5px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
</style>
