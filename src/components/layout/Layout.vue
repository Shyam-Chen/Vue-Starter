<script setup>
import { reactive } from 'vue';

import TopHeader from './TopHeader.vue';
import StickyFooter from './StickyFooter.vue';

const topProgress = reactive({ progress: 0 });
</script>

<template>
  <div class="h-full flex flex-col relative">
    <div v-show="topProgress.progress !== 100" class="absolute left-0 top-0 h-0.5 w-full">
      <div class="w-full h-full bg-gray-200 absolute"></div>

      <div
        class="transition-all ease-in h-full bg-red-500 absolute"
        :style="{ width: `${topProgress.progress}%` }"
      ></div>
    </div>

    <TopHeader />

    <main class="flex-auto flex-shrink-0 w-full max-w-6xl my-0 mx-auto">
      <slot></slot>
    </main>

    <StickyFooter />
  </div>
</template>
