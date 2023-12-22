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
    left.value = `${percentage}%`;
  },
  { immediate: true },
);

const wraper = ref();

const onInput = (evt: Event) => {
  const slides = wraper.value.querySelectorAll('input');
  const min = parseFloat(slides[0].min);
  const max = parseFloat(slides[0].max);

  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);

  const percentageMin = (slide1 / (max - min)) * 100;
  const percentageMax = (slide2 / (max - min)) * 100;

  wraper.value.style.setProperty('--range-slider-value-low', percentageMin);
  wraper.value.style.setProperty('--range-slider-value-high', percentageMax);

  if (slide1 > slide2) {
    const tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;

    if (evt?.currentTarget === slides[0]) {
      slides[0].insertAdjacentElement('beforebegin', slides[1]);
    } else {
      slides[1].insertAdjacentElement('afterend', slides[0]);
    }
  }

  wraper.value.querySelector('.RangeSlider__display').setAttribute('data-low', slide1);
  wraper.value.querySelector('.RangeSlider__display').setAttribute('data-high', slide2);
};
</script>

<template>
  <div ref="wraper" class="RangeSlider">
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      value="0"
      class="RangeSlider__input"
      @input="onInput"
    />
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      value="100"
      class="RangeSlider__input"
      @input="onInput"
    />
    <div class="RangeSlider__display"></div>
  </div>
</template>

<style lang="scss" scoped>
.RangeSlider {
  // Settings
  $range-slider-height: 24px;
  $range-slider-track-height: 4px;
  $range-slider-thumb-size: 24px;
  $range-slider-color: #6366f1;

  --range-slider-value-low-fallback: calc(var(--range-slider-value-low, 0) * 1%);
  --range-slider-value-high-fallback: calc(var(--range-slider-value-high, 100) * 1%);
  --range-slider-thumb-size: #{$range-slider-thumb-size};
  --range-slider-thumb-radius: calc(var(--range-slider-thumb-size) / 2);

  @media (max-width: 500px) {
    --range-slider-thumb-size: #{$range-slider-thumb-size * 1.5};
  }

  position: relative;
  width: 100%;
  height: $range-slider-height;

  &::before {
    content: '';

    @apply left-0 top-1/2 -mt-1 w-full;

    @apply absolute h-2 bg-slate-400/60 rounded;

    background-image: linear-gradient(
      to right,
      transparent var(--range-slider-value-low-fallback),
      $range-slider-color var(--range-slider-value-low-fallback),
      $range-slider-color var(--range-slider-value-high-fallback),
      transparent var(--range-slider-value-high-fallback)
    );
    pointer-events: none;
  }

  // Only used to display current values
  &__display {
    pointer-events: none;

    &::before,
    &::after {
      // Offset used to compensate for thumb position in range slider
      $offset: calc(var(--range-slider-thumb-radius) * calc(-0.02 * var(--pos) + 1));

      content: attr(data-span);

      transform: translateX(-50%) translateX($offset);

      @apply absolute bg-primary-500 -top-8 z-10;
      @apply px-2 py-1 text-white rounded;
    }

    &::before {
      --pos: var(--range-slider-value-low);

      content: attr(data-low);
      bottom: 100%;
      margin-bottom: calc(var(--range-slider-thumb-size) / 4);
      left: var(--range-slider-value-low-fallback);
    }

    &::after {
      --pos: var(--range-slider-value-high);

      content: attr(data-high);
      top: 100%;
      margin-top: calc(var(--range-slider-thumb-size) / 4);
      left: var(--range-slider-value-high-fallback);
    }
  }

  &__input {
    @apply pointer-events-none;
    @apply appearance-none outline-none;

    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    margin: 0;
    padding: 0;
    transform: translateY(-50%);
    background-color: transparent;

    &::-webkit-slider-thumb {
      @apply pointer-events-auto;
      @apply appearance-none cursor-ew-resize;
      @apply w-4 h-4 bg-primary-600 rounded-full shadow transition;

      &:hover {
        @apply ring-5 ring-primary-500/40;
      }

      &:active {
        @apply ring-7 ring-primary-500/40;
      }
    }

    &::-moz-range-thumb {
      @apply pointer-events-auto;
      @apply appearance-none cursor-ew-resize border-0;
      @apply w-4 h-4 bg-primary-600 rounded-full shadow transition;

      &:hover {
        @apply ring-5 ring-primary-500/40;
      }

      &:active {
        @apply ring-7 ring-primary-500/40;
      }
    }
  }
}
</style>
