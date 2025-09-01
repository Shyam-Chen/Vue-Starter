<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

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

const valueModel = computed({
  get: () => props.value || '0',
  set: (val) => emit('update:value', val),
});

const backgroundSize = ref('0 100%');
const left = ref('0');

watch(
  () => valueModel.value,
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
</script>

<template>
  <div
    class="w-full flex justify-center"
    :class="[{ 'pb-5': steppable }, disabled ? 'opacity-60' : '']"
  >
    <div class="Slider-Wrapper">
      <input
        v-model="valueModel"
        v-bind="$attrs"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="Slider-Input"
        :style="{ 'background-size': backgroundSize }"
      />

      <output class="Slider-Output" :style="{ left }">{{ valueModel }}</output>

      <div v-if="steppable" class="Slider-Steps">
        <div class="Slider-Step">
          <div class="Slider-StepNum">{{ min }}</div>
        </div>

        <div
          v-for="num in (Number(max) - Number(min)) / Number(step)"
          :key="num"
          class="Slider-Step"
        >
          <div class="Slider-StepNum">{{ num * Number(step) + Number(min) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Slider-Wrapper {
  @apply relative min-h-9.5 flex items-center;

  width: calc(100% - 1rem);
}

.Slider-Input {
  @apply appearance-none outline-none;
  @apply absolute cursor-pointer h-2 bg-slate-400/60 rounded;
  @apply bg-gradient-to-r from-primary-400 to-primary-600 bg-no-repeat;

  width: calc(100% + 1rem);
  left: -0.46875rem;

  &:focus {
    &::-webkit-slider-thumb {
      @apply ring-2 ring-primary-500/50;
    }

    &::-moz-range-thumb {
      @apply ring-2 ring-primary-500/50;
    }

    & + .Slider-Output {
      @apply block;
    }
  }

  &::-webkit-slider-thumb {
    @apply appearance-none cursor-ew-resize;
    @apply w-4 h-4 bg-primary-600 rounded-full shadow transition;

    &:hover {
      @apply ring-5 ring-primary-500/50;
    }

    &:active {
      @apply ring-7 ring-primary-500/50;
    }
  }

  &::-moz-range-thumb {
    @apply appearance-none cursor-ew-resize border-0;
    @apply w-4 h-4 bg-primary-600 rounded-full shadow transition;

    &:hover {
      @apply ring-5 ring-primary-500/50;
    }

    &:active {
      @apply ring-7 ring-primary-500/50;
    }
  }
}

.Slider-Output {
  @apply hidden;
  @apply absolute bg-primary-500 -top-8 z-10 -translate-x-1/2;
  @apply px-2 py-1 text-white rounded;
}

.Slider-Steps {
  @apply w-full flex justify-between;
}

.Slider-Step {
  @apply relative;

  &::before {
    @apply content-[''] absolute left-0 top-2 w-1px h-2 bg-slate-400;
  }
}

.Slider-StepNum {
  @apply absolute left-0.5px top-3 -translate-x-1/2;
}
</style>
