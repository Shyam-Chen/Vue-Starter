<template>
  <td class="Cell">
    <slot></slot>
  </td>
</template>

<style lang="scss" scoped>
.Cell {
  @apply h-38px px-4 py-0 align-middle whitespace-nowrap;

  > :deep(div) {
    @apply inline-flex items-center h-full;
  }
}
</style>
