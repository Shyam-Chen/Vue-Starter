<script lang="ts" setup>
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical';
  }>(),
  {
    orientation: 'horizontal',
  },
);
</script>

<template>
  <div
    class="Divider"
    :class="{
      horizontal: orientation === 'horizontal',
      vertical: orientation === 'vertical',
    }"
  ></div>
</template>

<style lang="scss" scoped>
.Divider {
  @apply bg-slate-200 dark:bg-slate-600;

  &.horizontal {
    @apply my-4 w-full h-1px;
  }

  &.vertical {
    @apply mx-4 w-1px min-h-full;
  }
}
</style>
