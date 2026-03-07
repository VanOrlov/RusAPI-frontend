<script setup lang="ts"></script>

<template>
  <div :class="$style.mascottContainer">
    <img src="public/mascott/base.png" alt="Акула" :class="$style.img">
  </div>
</template>

<style lang="scss" module>
.mascottContainer {
    position: absolute;
}
.img {
  width: 100px;
  display: block;
}
</style>