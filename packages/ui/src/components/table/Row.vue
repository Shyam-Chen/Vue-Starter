<template>
  <tr class="Row">
    <slot></slot>
  </tr>
</template>

<style lang="scss" scoped>
.Row {
  @apply hover:bg-slate-100 dark:hover:bg-slate-600 border-b last:border-b-0 dark:border-slate-600;
}
</style>
