<script setup lang="ts">
import { LoginForm } from 'src/features/login/ui';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

const route = useRoute();
const $q = useQuasar();
onMounted(() => {
  if (route.query.expired) {
    $q.notify({
      type: 'warning',
      message: 'Ваша сессия истекла или была завершена. Пожалуйста, войдите заново.',
      position: 'top',
      timeout: 3000,
      actions: [{ icon: 'close', color: 'white' }],
    });
  }
});
</script>

<template>
  <div :class="$style.loginContainer">
    <LoginForm />
  </div>
</template>

<style lang="scss" module>
.loginContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px; /* Добавили воздух по бокам для мобилок */
}
</style>
