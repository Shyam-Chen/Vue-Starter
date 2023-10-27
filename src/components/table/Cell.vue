<template>
  <td class="Cell">
    <slot></slot>
  </td>
</template>

<style lang="scss" scoped>
.Cell {
  @apply px-6 py-3 align-middle whitespace-nowrap;
}
</style>
