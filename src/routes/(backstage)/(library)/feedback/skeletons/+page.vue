<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XSkeleton, XButton } from '@x/ui';
import { useImage } from '@vueuse/core';
import { UseImage } from '@vueuse/components';

const imageOptions = ref({ src: 'https://place-hold.it/300x200' });
const colors = ['14b8a6', '8b5cf6', 'ec4899'];
const { isLoading } = useImage(imageOptions, { delay: 1000 });

function change() {
  imageOptions.value.src = '';
  const color = colors[Math.floor(Math.random() * colors.length)];
  imageOptions.value.src = `https://place-hold.it/300x200/${color}`;
}

const imageOptions2 = ref({ src: 'https://place-hold.it/300x200' });

function change2() {
  imageOptions2.value.src = '';
  const color = colors[Math.floor(Math.random() * colors.length)];
  imageOptions2.value.src = `https://place-hold.it/300x200/${color}`;
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Skeletons' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Skeletons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div
      class="border border-slate-300 dark:border-slate-500 rounded-md shadow-md p-4 w-full max-w-sm mx-auto"
    >
      <div class="flex space-x-4">
        <XSkeleton class="w-10 h-10 rounded-full" />

        <div class="flex-1 space-y-6 py-1">
          <XSkeleton class="h-2" />

          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <XSkeleton class="h-2 col-span-2" />
              <XSkeleton class="h-2 col-span-1" />
            </div>

            <XSkeleton class="h-2" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <XSkeleton class="aspect-video flex items-center justify-center h-48 rounded-md shadow-md">
        <div class="i-bi-image-alt w-12 h-12 text-gray-200"></div>
      </XSkeleton>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div>Image</div>

    <div
      v-if="isLoading"
      class="w-100 h-266.66px animate-pulse bg-slate-300/90 rounded-md shadow-md"
    ></div>
    <img
      v-else
      :src="imageOptions.src"
      class="w-100 h-266.66px bg-slate-300/90 rounded-md shadow-md"
    />

    <div>
      <XButton @click="change">Change</XButton>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div>Image (Component)</div>

    <UseImage
      :src="imageOptions2.src"
      class="w-100 h-266.66px bg-slate-300/90 rounded-md shadow-md"
    >
      <template #loading>
        <div class="w-100 h-266.66px animate-pulse bg-slate-300/90 rounded-md shadow-md"></div>
      </template>
    </UseImage>

    <div>
      <XButton @click="change2">Change</XButton>
    </div>
  </div>
</template>
