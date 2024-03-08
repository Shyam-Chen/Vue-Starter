<script lang="ts" setup>
import { XBreadcrumb, XCarousel } from '@lyra/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Carousel' }]" />

  <h1 class="text-4xl font-extrabold my-4">Carousel</h1>

  <div class="mt-4 mb-12">
    <div class="text-xl mb-2">Basic</div>

    <XCarousel class="w-full h-100">
      <div
        v-for="(item, index) in ['#14b8a6', '#8b5cf6', '#ec4899']"
        :key="item"
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none touch-none"
        :style="{ backgroundColor: item, left: `${50 + 100 * index}%` }"
      ></div>
    </XCarousel>
  </div>

  <div class="mt-4 mb-12">
    <div class="text-xl mb-2">Breakpoints</div>

    <XCarousel :move="45" class="w-full h-50">
      <div
        v-for="(item, index) in [
          'bg-red-500',
          'bg-orange-500',
          'bg-yellow-500',
          'bg-green-500',
          'bg-blue-500',
          'bg-indigo-500',
          'bg-purple-500',
        ]"
        :key="item"
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-full pointer-events-none touch-none rounded-lg"
        :class="item"
        :style="{ left: `${50 + 45 * index}%` }"
      ></div>
    </XCarousel>
  </div>
</template>
