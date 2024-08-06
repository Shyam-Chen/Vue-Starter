<script lang="ts" setup>
import 'vue-advanced-cropper/dist/style.css';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { ref } from 'vue';
import { XBreadcrumb, XCard, XButton } from '@x/ui';
import { CircleStencil, Cropper } from 'vue-advanced-cropper';

const cropper = ref<ComponentExposed<typeof Cropper>>();
const image = ref<string>();

function crop() {
  const result = cropper.value?.getResult();
  image.value = result?.canvas?.toDataURL();
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Cropper' }]" />

  <h1 class="text-4xl font-extrabold my-4">Cropper</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Cropper
        ref="cropper"
        src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        :stencilComponent="CircleStencil"
        :stencilProps="{ aspectRatio: 1 / 1 }"
        :stencilSize="{ width: 200, height: 200 }"
        class="w-full h-100"
      />

      <XButton label="Crop" class="my-4" @click="crop" />

      <div class="flex flex-col gap-1">
        <div>Result:</div>
        <img v-if="image" :src="image" class="size-50 rounded-full" />
      </div>
    </XCard>
  </section>
</template>
