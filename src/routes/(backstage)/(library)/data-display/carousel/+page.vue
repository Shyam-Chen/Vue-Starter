<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Carousel from '~/components/Carousel.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Carousel' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Carousel</div>
  </div>

  <div class="mt-4 mb-12">
    <div class="text-xl mb-2">Basic</div>

    <Carousel class="w-full h-100">
      <div
        v-for="(item, index) in ['#14b8a6', '#8b5cf6', '#ec4899']"
        :key="item"
        class="absolute w-full h-full"
      >
        <div
          class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none touch-none"
          :style="{ backgroundColor: item, left: `${50 + 100 * index}%` }"
        ></div>
      </div>
    </Carousel>
  </div>

  <div class="mt-4 mb-12">
    <div class="text-xl mb-2">Breakpoints</div>

    <Carousel :move="45" class="w-full h-50">
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
        class="absolute w-full h-full"
      >
        <div
          class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-full pointer-events-none touch-none rounded-lg"
          :class="item"
          :style="{ left: `${50 + 45 * index}%` }"
        ></div>
      </div>
    </Carousel>
  </div>
</template>
