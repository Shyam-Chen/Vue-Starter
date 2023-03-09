<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { add, sub, getYear } from 'date-fns';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId';

import getScrollableParent from '~/utilities/getScrollableParent';

import TextField from './TextField.vue';
import FadeTransition from './FadeTransition.vue';

const props = defineProps<{
  value?: number | string;
  disabled?: boolean;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val?: number | string): void;
}>();

const uid = uniqueId('year-picker-');

const target = ref();
const input = ref();
const picker = ref();

const modelDate = computed({
  get: () => {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  },
});

const flux = reactive({
  showDatePicker: false,
  scrollableParent: null as HTMLElement | null,
  direction: '' as 'down' | 'up' | '',
  openPicker() {
    flux.showDatePicker = true;

    flux.showYears = true;

    if (modelDate.value) {
      flux.currentMoment = new Date(Number(modelDate.value), 0);
    } else {
      flux.currentMoment = new Date();
    }

    const currentYear = getYear(flux.currentMoment);
    flux.yearRange = range(currentYear - 5, currentYear + 11);

    nextTick(() => {
      flux.scrollableParent = getScrollableParent(picker.value);

      const rect = input.value.$el.getBoundingClientRect();

      picker.value.style.left = `${rect.left}px`;
      picker.value.style.top = `${rect.top}px`;

      const center = window.innerHeight / 2;

      if (rect.top > center) {
        flux.direction = 'up';
      } else {
        flux.direction = 'down';
      }
    });
  },

  showYears: true,

  now: new Date(),
  currentMoment: new Date(),
  currentPeriodDates: [] as any[],

  yearRange: [] as number[],
  year: null as null | number,

  decrement() {
    flux.currentMoment = sub(flux.currentMoment, { years: 16 });
    const currentYear = getYear(flux.currentMoment);
    flux.yearRange = range(currentYear - 5, currentYear + 11);
  },
  increment() {
    flux.currentMoment = add(flux.currentMoment, { years: 16 });
    const currentYear = getYear(flux.currentMoment);
    flux.yearRange = range(currentYear - 5, currentYear + 11);
  },
  selectYear(val: number) {
    flux.showDatePicker = false;
    emit('update:value', val);
  },
});

const handleScroll = () => {
  if (flux.showDatePicker) {
    const rect = input.value.$el.getBoundingClientRect();
    picker.value.style.left = `${rect.left}px`;
    picker.value.style.top = `${rect.top}px`;
  }
};

onClickOutside(target, () => {
  flux.showDatePicker = false;
});

watch(
  () => flux.scrollableParent,
  (el) => {
    el?.addEventListener('scroll', handleScroll);
  },
);

onMounted(() => {
  if (flux.scrollableParent && flux.scrollableParent instanceof HTMLElement) {
    flux.scrollableParent?.addEventListener('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (flux.scrollableParent && flux.scrollableParent instanceof HTMLElement) {
    flux.scrollableParent?.removeEventListener('scroll', handleScroll);
  } else {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      :id="uid"
      ref="input"
      :value="String(modelDate)"
      :errorMessage="errorMessage"
      :disabled="disabled"
      append="i-fa-calendar-o"
      readonly
      @focus="flux.openPicker"
      @append="flux.openPicker"
    />

    <FadeTransition>
      <div
        v-if="flux.showDatePicker"
        ref="picker"
        class="fixed z-10 p-2 shadow-lg rounded bg-white"
        :class="{
          'DatePicker-DatePane-PlacementBottom': flux.direction === 'down',
          'DatePicker-DatePane-PlacementTop': flux.direction === 'up',
        }"
      >
        <div class="flex justify-between items-center mb-1">
          <div class="cursor-pointer hover:bg-slate-200 p-2 rounded-full" @click="flux.decrement">
            <div class="i-fa-chevron-left w-3 h-3"></div>
          </div>

          <div v-if="flux.showYears">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>

          <div class="cursor-pointer hover:bg-slate-200 p-2 rounded-full" @click="flux.increment">
            <div class="i-fa-chevron-right w-3 h-3"></div>
          </div>
        </div>

        <div v-show="flux.showYears" class="grid grid-cols-4 gap-1 text-center w-48">
          <div
            v-for="year in flux.yearRange"
            :key="year"
            :value="year"
            class="flex justify-center items-center hover:bg-slate-200 rounded text-sm cursor-pointer"
            :class="{
              'text-white bg-blue-400 important:hover:bg-blue-500': year === getYear(flux.now),
              'text-white bg-blue-600 important:hover:bg-blue-700':
                modelDate &&
                year === getYear(new Date(Number(modelDate), 0)) &&
                getYear(flux.currentMoment) === getYear(new Date(Number(modelDate), 0)),
            }"
            @click="flux.selectYear(year)"
          >
            {{ year }}
          </div>
        </div>
      </div>
    </FadeTransition>
  </div>
</template>

<style lang="scss" scoped>
.DatePicker-DatePane-PlacementBottom {
  transform: translateY(38px) translateY(0.5rem);
}

.DatePicker-DatePane-PlacementTop {
  transform: translateY(-100%) translateY(-0.5rem);
}
</style>
