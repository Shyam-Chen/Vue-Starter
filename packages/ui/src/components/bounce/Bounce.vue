<template>
  <Transition name="bounce">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce 0.33s;
}

.bounce-leave-active {
  animation: bounce 0.33s reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
