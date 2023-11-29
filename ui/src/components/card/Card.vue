<template>
  <div class="Card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.Card {
  @apply p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
}
</style>
