<script setup lang="ts">
import { SignupForm } from 'src/features/signup/ui';
</script>

<template>
  <div :class="$style.signupContainer">
    <SignupForm />
  </div>
</template>

<style lang="scss" module>
.signupContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px; /* Добавили отступы для мобилок */
}
</style>
