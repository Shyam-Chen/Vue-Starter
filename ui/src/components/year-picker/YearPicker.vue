<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from 'vue';
import { onClickOutside } from '@vueuse/core';
import * as d from 'date-fns';
import range from 'lodash/range';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';

import TextField from '../text-field/TextField.vue';
import Fade from '../fade/Fade.vue';

const valueModel = defineModel<number | string>('value');

defineProps<{
  disabled?: boolean;
}>();

const target = ref<HTMLDivElement>();
const input = ref<typeof TextField>();
const picker = ref<HTMLDivElement>();

const flux = reactive({
  showDatePicker: false,
  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    if (input.value && picker.value) {
      const rect = input.value.$el.querySelector('.TextField-Input').getBoundingClientRect();

      picker.value.style.left = `${rect.left}px`;

      const center = window.innerHeight / 2;

      if (rect.top > center) {
        picker.value.style.top = `${rect.top}px`;
        flux.direction = 'up';
      } else {
        picker.value.style.top = `${rect.bottom}px`;
        flux.direction = 'down';
      }
    }
  },
  openPicker() {
    flux.showDatePicker = true;

    flux.showYears = true;

    if (valueModel.value) {
      flux.currentMoment = new Date(Number(valueModel.value), 0);
    } else {
      flux.currentMoment = new Date();
    }

    const currentYear = d.getYear(flux.currentMoment);
    flux.yearRange = range(currentYear - 5, currentYear + 11);

    nextTick(() => {
      flux.resizePanel();
    });
  },

  showYears: true,

  now: new Date(),
  currentMoment: new Date(),

  yearRange: [] as number[],
  year: null as null | number,

  decrement() {
    flux.currentMoment = d.sub(flux.currentMoment, { years: 16 });
    const currentYear = d.getYear(flux.currentMoment);
    flux.yearRange = range(currentYear - 5, currentYear + 11);
  },
  increment() {
    flux.currentMoment = d.add(flux.currentMoment, { years: 16 });
    const currentYear = d.getYear(flux.currentMoment);
    flux.yearRange = range(currentYear - 5, currentYear + 11);
  },
  selectYear(val: number) {
    flux.showDatePicker = false;
    valueModel.value = val;
  },
});

onClickOutside(target, () => {
  flux.showDatePicker = false;
});

useScrollParent(
  computed(() => picker.value),
  () => {
    if (flux.showDatePicker) flux.resizePanel();
  },
);
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      ref="input"
      v-bind="$attrs"
      :value="valueModel ? String(valueModel) : ''"
      :disabled="disabled"
      append="i-fa-calendar-o"
      readonly
      @focus="flux.openPicker"
      @append="flux.openPicker"
    >
      <slot></slot>
    </TextField>

    <Fade>
      <div
        v-if="flux.showDatePicker"
        ref="picker"
        class="fixed z-101 p-2 shadow-lg rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
        :class="{
          'DatePicker-DatePane-PlacementBottom': flux.direction === 'down',
          'DatePicker-DatePane-PlacementTop': flux.direction === 'up',
        }"
      >
        <div class="flex justify-between items-center mb-1">
          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="flux.decrement"
          >
            <div class="i-fa-chevron-left w-3 h-3"></div>
          </div>

          <div v-if="flux.showYears">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>

          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="flux.increment"
          >
            <div class="i-fa-chevron-right w-3 h-3"></div>
          </div>
        </div>

        <div v-show="flux.showYears" class="grid grid-cols-4 gap-1 text-center w-48">
          <div
            v-for="year in flux.yearRange"
            :key="year"
            :value="year"
            class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm cursor-pointer"
            :class="{
              'ring-1 ring-primary-500': year === d.getYear(flux.now),
              'text-white bg-primary-600 important:hover:bg-primary-700':
                valueModel &&
                year === d.getYear(new Date(Number(valueModel), 0)) &&
                d.getYear(flux.currentMoment) === d.getYear(new Date(Number(valueModel), 0)),
            }"
            @click="flux.selectYear(year)"
          >
            {{ year }}
          </div>
        </div>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.DatePicker-DatePane-PlacementBottom {
  transform: translateY(0.5rem);
}

.DatePicker-DatePane-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}
</style>
