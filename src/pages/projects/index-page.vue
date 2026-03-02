<script setup lang="ts">
import { ProjectsListWidget } from 'src/widgets/projects/ui';
</script>

<template>
  <div :class="$style.container">
    <ProjectsListWidget />
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 16px;
  width: 100%;
  margin: 0 auto;
  gap: 32px;
}
</style>
