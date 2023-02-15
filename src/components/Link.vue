<script lang="ts" setup>
import { RouterLink } from 'vue-router';

defineProps<{
  to: string;
}>();
</script>

<template>
  <RouterLink v-bind="$attrs" :to="to" class="link"><slot></slot></RouterLink>
</template>

<style lang="scss" scoped>
.link {
  @apply font-bold text-sm text-primary-500;
  @apply hover:underline hover:text-primary-600 dark:hover:text-primary-400;
}
</style>
