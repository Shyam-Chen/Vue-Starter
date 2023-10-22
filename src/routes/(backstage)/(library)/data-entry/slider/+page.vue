<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Slider from '~/components/Slider.vue';
import InputMask from '~/components/InputMask.vue';

const flux = reactive({
  slider: '0',
  sliderVal: 0,
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Slider' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Slider</div>
  </div>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Basic</div>

    <div class="flex justify-center">
      <Slider v-model:value="flux.slider" />
    </div>

    <div>
      <pre>Output: {{ flux.slider }}</pre>
    </div>
  </div>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Input</div>

    <div class="flex flex-col justify-center gap-2">
      <InputMask
        v-model:masked="flux.slider"
        v-model:unmasked.number="flux.sliderVal"
        :mask="{ mask: Number, min: 0, max: 100 }"
      />
      <Slider v-model:value="flux.slider" />
    </div>

    <div>
      <pre>Output: {{ flux.slider }}</pre>
    </div>
  </div>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Step</div>

    <div class="flex justify-center">
      <Slider v-model:value="flux.slider" steppable step="10" />
    </div>

    <div>
      <pre>Output: {{ flux.slider }}</pre>
    </div>
  </div>
</template>
