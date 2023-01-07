<script lang="ts" setup>
import { ref, useSlots } from 'vue';

const text = ref('');

const slots = useSlots();
const defaultSlot = slots.default?.();

if (defaultSlot) {
  text.value = '...';
}

// const VNode = () => {
//   return el?.map((item) => {
//     if (keys.includes(item)) {
//       return h('span', slots[item]?.());
//     }

//     return h('span', null, item);
//   });
// };
</script>

<template>
  <!-- <VNode /> -->
  <div></div>
</template>

<!--
<Highlight :query="['spotlight', 'emphasize', 'Accentuate']">
  With the Highlight component, you can spotlight, emphasize and accentuate words.
</Highlight>
 -->
