<script lang="ts" setup>
import { ref } from 'vue';
import { useImage } from '@vueuse/core';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Skeleton from '~/components/Skeleton.vue';
import Button from '~/components/Button.vue';

const imageOptions = ref({ src: 'https://place.dog/300/200' });
const { isLoading } = useImage(imageOptions, { delay: 1000 });

function change() {
  const time = new Date().getTime();
  imageOptions.value.src = `https://place.dog/300/200?t=${time}`;
}
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Skeletons', disabled: true },
    ]"
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
