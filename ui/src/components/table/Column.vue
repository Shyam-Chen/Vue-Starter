<template>
  <th class="Column">
    <slot></slot>
  </th>
</template>

<style lang="scss" scoped>
.Column {
  @apply h-9.5 px-4 py-0;
  @apply text-zinc-600 dark:text-zinc-400 bg-gray-200 dark:bg-gray-700;
  @apply align-middle whitespace-nowrap font-semibold text-left;

  > :deep(div) {
    @apply inline-flex items-center h-full;
  }
}
</style>
