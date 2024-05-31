<script lang="ts" setup>
import { ref } from 'vue';
import { useVirtualList } from '@vueuse/core';

import leetcode from './leetcode';

const height = 40;

const allItems = ref(
  Array.from([
    ...leetcode.page1,
    ...leetcode.page2,
    ...leetcode.page3,
    ...leetcode.page4,
    ...leetcode.page5,
  ]).map((item) => ({
    title: item.title,
    height: height,
  })),
);

const { list, containerProps, wrapperProps } = useVirtualList(allItems, {
  itemHeight: (i) => allItems.value[i].height,
  overscan: 10,
});
</script>

<template>
  <div
    v-bind="containerProps"
    class="w-full h-80 whitespace-nowrap overflow-auto p-2 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
  >
    <div v-bind="wrapperProps" class="important:w-min min-w-full">
      <div
        v-for="{ index, data } in list"
        :key="index"
        class="flex items-center px-4 py-2 hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600 hover:rounded"
        :style="{ height: `${data.height}px` }"
      >
        {{ data.title }}
      </div>
    </div>
  </div>
</template>
