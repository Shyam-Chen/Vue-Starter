<script lang="ts" setup>
defineProps<{
  prepend?: boolean | string;
  append?: string;
}>();
</script>

<template>
  <li class="ListboxItem">
    <div
      v-if="prepend"
      class="size-5 me-2"
      :class="typeof prepend === 'string' ? prepend : ''"
    ></div>
    <div class="flex-1"><slot></slot></div>
    <div v-if="append" class="size-5 ms-2" :class="append"></div>
  </li>
</template>

<style lang="scss" scoped>
.ListboxItem {
  @apply flex items-center px-3 py-1 cursor-pointer;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600 hover:rounded-md;
}
</style>
