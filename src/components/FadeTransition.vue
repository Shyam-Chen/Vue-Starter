<script lang="ts" setup></script>

<template>
  <Transition name="fade">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
