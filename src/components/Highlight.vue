<script lang="ts" setup>
import { toRef, useSlots, h } from 'vue';

const prop = defineProps<{ query?: string[] }>();

const queryRef = toRef(prop, 'query', []);

const slots = useSlots();
const defaultSlot = slots.default?.();

const VNode = () => {
  const message: any = defaultSlot?.[0]?.children || '';

  const result = [] as any;
  let currentIndex = 0;

  for (let i = 0; i < queryRef.value.length; i++) {
    const word = queryRef.value[i];
    const index = message.toLowerCase().indexOf(word.toLowerCase());

    if (index !== -1) {
      result.push(message.slice(currentIndex, index));
      result.push(
        h(
          'span',
          { class: 'font-bold text-yellow-600 dark:text-yellow-500' },
          message.slice(index, index + word.length),
        ),
      );

      currentIndex = index + word.length;
    }
  }

  result.push(message.slice(currentIndex));

  return h('span', null, result);
};
</script>

<template>
  <VNode />
</template>

<!--
<Highlight :query="['spotlight', 'emphasize', 'Accentuate']">
  With the Highlight component, you can spotlight, emphasize and accentuate words.
</Highlight>
 -->
