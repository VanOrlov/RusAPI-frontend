<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginStore } from '../model/store/login.store';
import { ROUTE_NAMES } from 'src/shared/app/model';
import { ref } from 'vue';

const loginStore = useLoginStore();
const router = useRouter();

const isPwdVisible = ref(false);

const onSubmit = async () => {
  const success = await loginStore.login();
  if (success) {
    await router.push({ name: ROUTE_NAMES.ACCOUNT });
  }
};
</script>

<template>
  <div :class="$style.loginContainer">
    <div :class="$style.formTitle" v-motion-slide-up-fast>Вход</div>
    <div :class="$style.formContainer" v-motion-slide-up>
      <QForm @submit="onSubmit">
        <QInput v-model="loginStore.loginData.email" color="secondary" label="Email" type="email">
          <template v-slot:prepend>
            <QIcon name="email" />
          </template>
        </QInput>
        <QInput
          v-model="loginStore.loginData.password"
          color="secondary"
          label="Пароль"
          :type="isPwdVisible ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <QIcon name="lock" />
          </template>
          <template v-slot:append>
            <QIcon
              :name="isPwdVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdVisible = !isPwdVisible"
            />
          </template>
        </QInput>
        <QBtn
          type="submit"
          :disable="!loginStore.isLoginDataValid"
          :loading="loginStore.btnLoading"
          color="secondary"
          label="Войти"
          no-caps
          :class="$style.loginBtn"
        />
      </QForm>
    </div>
    <div :class="$style.formFooter" v-motion-slide-up-late>
      Нет аккаунта?
      <router-link to="/signup" :class="$style.formFooterLink">Зарегистрироваться</router-link>
    </div>
  </div>
</template>

<style lang="scss" module>
.loginContainer {
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
  box-shadow: 0 0 3px 0px var(--card-shadow);
  background-color: var(--bg-surface);

  @media (max-width: 400px) {
    padding: 16px;
  }
}

.formFooter {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-align: center;

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

.pwsInput {
  position: relative;
}

.loginBtn {
  width: 100%;
  margin-top: 15px;
}
</style>
