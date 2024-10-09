<template>
  <td class="Cell">
    <slot></slot>
  </td>
</template>

<style lang="scss" scoped>
.Cell {
  @apply h-9.5 px-4 py-0 align-middle whitespace-nowrap;

  > :deep(div) {
    @apply inline-flex items-center h-full;
  }
}
</style>
