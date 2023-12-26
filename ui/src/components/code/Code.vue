<template>
  <code class="Code"><slot></slot></code>
</template>

<style lang="scss" scoped>
.Code {
  @apply px-1.5 py-0.5 h-fit font-mono font-normal inline-block whitespace-nowrap text-gray-700 bg-gray-300 text-sm rounded;
}
</style>
