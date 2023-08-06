<script lang="ts" setup>
import { ref } from 'vue';
import { useImage } from '@vueuse/core';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Skeleton from '~/components/Skeleton.vue';
import Button from '~/components/Button.vue';

const imageOptions = ref({ src: 'https://place-hold.it/300x200' });
const colors = ['14b8a6', '8b5cf6', 'ec4899'];
const { isLoading } = useImage(imageOptions, { delay: 1000 });

function change() {
  imageOptions.value.src = '';
  const color = colors[Math.floor(Math.random() * colors.length)];
  imageOptions.value.src = `https://place-hold.it/300x200/${color}`;
}
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Skeletons' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Skeletons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Skeleton />
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div>Image</div>

    <div
      v-if="isLoading"
      class="w-100 h-266.66px animate-pulse bg-slate-300/90 shadow-md rounded-md"
    ></div>
    <img
      v-else
      :src="imageOptions.src"
      class="w-100 h-266.66px bg-slate-300/90 shadow-md rounded-md"
    />

    <div>
      <Button @click="change">Change</Button>
    </div>
  </div>
</template>
