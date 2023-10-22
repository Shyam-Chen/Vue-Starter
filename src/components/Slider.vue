<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    value?: string;
    min?: string;
    max?: string;
    step?: string;
    steppable?: boolean;
    disabled?: boolean;
  }>(),
  {
    value: '0',
    min: '0',
    max: '100',
    step: '1',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'change', val: string): void;
}>();

const sliderValue = computed({
  get: () => props.value || '0',
  set: (val) => emit('update:value', val),
});

const backgroundSize = ref('0 100%');
const left = ref('0');

watch(
  () => sliderValue.value,
  (val) => {
    const _val = Number(val);
    const _min = Number(props.min);
    const _max = Number(props.max);
    const percentage = ((_val - _min) * 100) / (_max - _min);

    backgroundSize.value = `${percentage}% 100%`;
    left.value = `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
  },
  { immediate: true },
);
</script>

<template>
  <div class="slider">
    <input
      v-model="sliderValue"
      v-bind="$attrs"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="slider-input"
      :style="{ 'background-size': backgroundSize }"
    />

    <output class="slider-output" :style="{ left }">{{ sliderValue }}</output>

    <div v-if="steppable" class="Slider-Steps">
      <div class="Slider-Step">
        <div class="Slider-StepNum">{{ min }}</div>
      </div>

      <div v-for="num in Number(max) / Number(step)" :key="num" class="Slider-Step">
        <div class="Slider-StepNum">{{ num * Number(step) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Slider-Steps {
  @apply absoulte left-0 bottom-0 w-full flex justify-between pb-8;
}

.Slider-Step {
  @apply relative;

  &::before {
    @apply content-[''] absolute left-0 top-0 w-1px h-2 bg-slate-400;
  }
}

.Slider-StepNum {
  @apply absolute left-0.5px top-1 -translate-x-1/2;
}

.slider {
  @apply w-full relative;
}

.slider-input {
  @apply appearance-none outline-none cursor-pointer;
  @apply w-full h-2 bg-slate-400/60 rounded;
  @apply bg-gradient-to-r from-primary-400 to-primary-600 bg-no-repeat;

  &::-webkit-slider-thumb {
    @apply appearance-none cursor-ew-resize;
    @apply w-4 h-4 bg-primary-600 rounded-full shadow transition;

    &:hover {
      @apply ring-5 ring-primary-500/40;
    }

    &:active {
      @apply ring-7 ring-primary-500/40;
    }
  }

  &:hover + .slider-output {
    @apply block;
  }
}

.slider-output {
  @apply hidden;
  @apply absolute bg-primary-500 -top-8 z-10 -translate-x-1/2;
  @apply px-2 py-1 text-white rounded;
}
</style>
