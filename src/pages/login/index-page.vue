<script setup lang="ts">
import { LoginForm } from 'src/features/login/ui';


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
}
</style>