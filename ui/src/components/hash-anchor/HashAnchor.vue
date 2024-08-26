<script lang="ts" setup>
import { h } from 'vue';

const props = defineProps<{
  hash?: string;
}>();

const Hashtag = () => {
  return h(
    'a',
    {
      href: `#${props.hash}`,
      class:
        'absolute left-0 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500 dark:text-primary-400 select-none',
    },
    '#',
  );
};
</script>

<template>
  <div :id="hash" class="relative group scroll-mt-24">
    <slot :Hashtag></slot>
  </div>
</template>
