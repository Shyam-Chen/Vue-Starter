<script lang="ts" setup>
import { provide, useTemplateRef } from 'vue';

const defaultModel = defineModel<number>({ default: undefined });

const container = useTemplateRef<HTMLDivElement>('container');

provide('ButtonGroup', {
  defaultModel,
  container,
});
</script>

<template>
  <div ref="container" class="ButtonGroup">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.ButtonGroup {
  @apply inline-flex w-full overflow-auto;

  :deep(.Button) {
    @apply !first:rounded-l !rounded-0 !last:rounded-r;
    @apply !first:border-l !border-l-0;
  }

  :deep(.Popover .Button) {
    @apply !px-2;
    @apply !rounded-0 !rounded-r;
    @apply !border-l-0;
  }
}
</style>
