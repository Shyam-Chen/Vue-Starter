<script lang="ts" setup>
import type { VNode } from 'vue';
import { toRef, useSlots, h } from 'vue';

const prop = defineProps<{
  query?: string[];
}>();

const queryRef = toRef(prop, 'query', []);

const slots = useSlots();
const defaultSlot = slots.default?.();

const Render = () => {
  const message = (defaultSlot?.[0]?.children || '') as string;

  const result = [] as Array<string | VNode>;
  let currentIndex = 0;

  const sortedQuery = queryRef.value
    .map((word) => ({
      index: message.toLowerCase().indexOf(word.toLowerCase()),
      length: word.length,
    }))
    .sort((a, b) => a.index - b.index);

  for (let i = 0; i < sortedQuery.length; i++) {
    const { index, length } = sortedQuery[i];

    if (index !== -1) {
      result.push(message.slice(currentIndex, index));

      result.push(
        h(
          'span',
          { class: 'font-bold text-yellow-600 dark:text-yellow-500' },
          message.slice(index, index + length),
        ),
      );

      currentIndex = index + length;
    }
  }

  result.push(message.slice(currentIndex));

  return h('span', null, result);
};
</script>

<template>
  <Render />
</template>
