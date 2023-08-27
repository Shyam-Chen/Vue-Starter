<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Carousel from '~/components/Carousel.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Carousel' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Carousel</div>
  </div>

  <div class="my-4">
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
</template>
