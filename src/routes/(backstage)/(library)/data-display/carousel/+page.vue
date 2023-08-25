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
    <Carousel>
      <div
        v-for="(item, index) in ['14b8a6', '8b5cf6', 'ec4899']"
        :key="item"
        class="absolute w-full h-full"
      >
        <img
          :src="`https://place-hold.it/300x200/${item}`"
          class="absolute top-1/2 -z-1 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          :style="{ left: `${50 + 100 * index}%` }"
        />
      </div>
    </Carousel>
  </div>
</template>
