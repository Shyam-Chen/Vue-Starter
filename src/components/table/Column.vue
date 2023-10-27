<template>
  <th class="Column">
    <slot></slot>
  </th>
</template>

<style lang="scss" scoped>
.Column {
  @apply px-6 py-3 bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200;
  @apply border border-solid border-blueGray-100 dark:border-blueGray-600 border-l-0 border-r-0;
  @apply text-xs uppercase align-middle whitespace-nowrap font-semibold;
}
</style>
