<script setup lang="ts">
import { TheFooter } from 'src/widgets/footer/ui';
import { TheHeader } from 'src/widgets/header/ui';
</script>

<template>
  <QLayout view="lHh Lpr lff" :class="$style.layout">
    <TheHeader />

    <QPageContainer :class="$style.pageContainer">
      <RouterView />
    </QPageContainer>

    <TheFooter />
  </QLayout>
</template>

<style lang="scss" module>
.layout {
  padding: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #ffffff;
  background-image: radial-gradient(rgba(38, 166, 154, 0.1) 2px, #ffffff 2px);
  background-size: 40px 40px;
}

.pageContainer {
  height: 100%;
}
</style>
