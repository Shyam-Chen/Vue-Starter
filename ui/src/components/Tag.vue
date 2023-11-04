<template>
  <div class="Tag">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.Tag {
  @apply inline-flex items-center bg-primary-500 text-white;
  @apply text-xs px-2 py-1 rounded;
}
</style>
