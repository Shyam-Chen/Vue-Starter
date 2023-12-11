<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XSlider, XInputMask } from '@x/ui';

const flux = reactive({
  slider: '70',
  sliderVal: 70,
  stepSlider: '30',
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Slider' }]" />

  <h1 class="text-4xl font-extrabold my-4">Slider</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>
    <p class="my-4">Two-way value binding is defined using `v-model:value`.</p>

    <XCard>
      <div class="flex justify-center">
        <XSlider v-model:value="flux.slider" />
      </div>
    </XCard>

    <div>
      <pre>Output: {{ flux.slider }}</pre>
    </div>
  </section>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Disabled</div>

    <div class="flex justify-center">
      <XSlider v-model:value="flux.slider" disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Input</div>

    <div class="flex flex-col justify-center gap-2">
      <XInputMask
        v-model:masked="flux.slider"
        v-model:unmasked.number="flux.sliderVal"
        :mask="{ mask: Number, min: 0, max: 100 }"
      />
      <XSlider v-model:value="flux.slider" />
    </div>

    <div>
      <pre>Output: {{ flux.slider }}</pre>
    </div>
  </div>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Step</div>

    <div class="flex justify-center">
      <XSlider v-model:value="flux.stepSlider" steppable step="10" />
    </div>

    <div>
      <pre>Output: {{ flux.stepSlider }}</pre>
    </div>
  </div>

  <div class="flex flex-col border p-4 my-4 gap-2">
    <div class="font-bold">Range (TODO)</div>
  </div>
</template>
