<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XSlider, XInputMask, XRangeSlider } from '@lyra/ui';

const flux = reactive({
  slider: '70',
  sliderVal: 70,
  stepSlider: '30',

  rangeSliderStartVal: '0',
  rangeSliderEndVal: '100',
  stepRangeSliderStartVal: '0',
  stepRangeSliderEndVal: '100',
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Slider' }]" />

  <h1 class="text-4xl font-extrabold my-4">Slider</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>
    <p class="my-4">Two-way value binding is defined using `v-model:value`.</p>

    <XCard>
      <XSlider v-model:value="flux.slider" />
      <div class="mt-1">Output: {{ flux.slider }}</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XSlider v-model:value="flux.slider" disabled />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Input</h2>

    <XCard>
      <div class="flex flex-col justify-center gap-2">
        <XInputMask
          v-model:masked="flux.slider"
          v-model:unmasked.number="flux.sliderVal"
          :mask="{ mask: Number, min: 0, max: 100 }"
        />

        <XSlider v-model:value="flux.slider" />
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Step</h2>

    <XCard>
      <XSlider v-model:value="flux.stepSlider" steppable step="10" />
      <div class="mt-1">Output: {{ flux.stepSlider }}</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">RangeSlider</h2>

    <XCard>
      <XRangeSlider
        v-model:startValue="flux.rangeSliderStartVal"
        v-model:endValue="flux.rangeSliderEndVal"
      />
      <div class="mt-1">Output: {{ flux.rangeSliderStartVal }} ~ {{ flux.rangeSliderEndVal }}</div>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Steppable</h3>

      <XCard>
        <XRangeSlider
          v-model:startValue="flux.stepRangeSliderStartVal"
          v-model:endValue="flux.stepRangeSliderEndVal"
          steppable
          step="10"
        />
        <div class="mt-1">
          Output: {{ flux.stepRangeSliderStartVal }} ~ {{ flux.stepRangeSliderEndVal }}
        </div>
      </XCard>
    </section>
  </section>
</template>
