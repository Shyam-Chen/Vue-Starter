<script lang="ts" setup>
defineProps<{
  title?: string;
  date?: string;
}>();
</script>

<template>
  <li class="TimelineItem">
    <div class="TimelineItem-Line"></div>
    <time class="TimelineItem-Date">{{ date }}</time>
    <h3 class="TimelineItem-Title">{{ title }}</h3>
    <slot></slot>
  </li>
</template>

<style lang="scss" scoped>
.TimelineItem {
  @apply mb-10 ml-4;

  &:last-child {
    @apply mb-0;
  }
}

.TimelineItem-Line {
  @apply absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700;
}

.TimelineItem-Date {
  @apply mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500;
}

.TimelineItem-Title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}
</style>
