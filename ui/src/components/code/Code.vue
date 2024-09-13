<template>
  <code class="Code"><slot></slot></code>
</template>

<style lang="scss" scoped>
.Code {
  @apply inline-block px-1.5 py-0.5 h-fit;
  @apply font-mono text-sm font-normal text-gray-700 align-middle whitespace-nowrap;
  @apply bg-gray-300 rounded;
}
</style>
