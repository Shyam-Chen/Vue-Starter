<template>
  <div class="overflow-hidden w-full h-1 bg-primary-200">
    <div class="progress-bar-value w-full h-1 bg-primary-500"></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar-value {
  animation: indeterminate 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminate {
  0% {
    transform: translateX(0) scaleX(0);
  }

  40% {
    transform: translateX(0) scaleX(0.4);
  }

  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
