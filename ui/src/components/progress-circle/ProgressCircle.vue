<script lang="ts" setup>
withDefaults(
  defineProps<{
    percentage?: number;
  }>(),
  {
    percentage: 0,
  },
);
</script>

<template>
  <div class="ProgressCircle">
    <svg class="ProgressCircle-Container" width="150" viewBox="0 0 20 20">
      <circle class="ProgressCircle-Track" cx="10" cy="10" r="8" />
      <circle
        class="ProgressCircle-Value"
        cx="10"
        cy="10"
        r="8"
        :stroke-dashoffset="100 - percentage / 2"
      />
    </svg>

    <div class="ProgressCircle-Label">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ProgressCircle {
  @apply relative inline-flex;
}

.ProgressCircle-Container {
  @apply w-25 h-25 -rotate-90;
}

.ProgressCircle-Track {
  @apply fill-none stroke-zinc-200 dark:stroke-zinc-600 stroke-2;
}

.ProgressCircle-Value {
  @apply fill-none stroke-primary-500 stroke-2;

  stroke-dasharray: 100 100;
  stroke-linecap: round;
}

.ProgressCircle-Label {
  @apply absolute left-1/2 top-1/2 -translate-1/2;
  @apply w-full text-primary-500 text-center;
}
</style>
