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
  get: () => props.value,
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

    <output class="slider-output" :style="{ left: left }">{{ sliderValue }}</output>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  @apply w-full relative;
}

.slider-input {
  @apply appearance-none outline-none cursor-pointer;
  @apply w-full h-2 bg-slate-400/60 rounded;
  @apply bg-gradient-to-r from-primary-500 to-primary-500 bg-no-repeat;

  &::-webkit-slider-thumb {
    @apply appearance-none cursor-ew-resize;
    @apply w-4 h-4 bg-primary-500 rounded-full shadow transition;
  }

  // &:hover + .slider-output {
  //   @apply block;
  // }
}

.slider-output {
  // @apply hidden;
  @apply absolute bg-primary-500 -top-8 -translate-x-1/2;
  @apply px-2 py-1 text-white rounded;
}
</style>
