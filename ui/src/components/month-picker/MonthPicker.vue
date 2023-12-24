<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { format as _format, add, sub, getYear, setYear, getMonth, setMonth } from 'date-fns';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';

import TextField from '../text-field/TextField.vue';
import Fade from '../fade/Fade.vue';

const props = withDefaults(
  defineProps<{
    value?: string;
    format?: string;
    months?: string[];
  }>(),
  {
    value: '',
    format: 'yyyy/MM',
    // prettier-ignore
    months: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val?: string): void;
}>();

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
  direction: '' as 'down' | 'up' | '',
  resizePanel() {
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
  },
  openPicker() {
    flux.showDatePicker = true;

    if (modelDate.value) {
      flux.currentMoment = new Date(modelDate.value);
    } else {
      flux.currentMoment = new Date();
    }

    nextTick(() => {
      flux.resizePanel();
    });
  },

  showWeeks: false,
  showYears: false,
  showMonths: true,

  now: new Date(),
  currentMoment: new Date(),

  yearRange: [] as number[],
  year: null as null | number,

  decrement() {
    if (flux.showMonths) {
      flux.currentMoment = sub(flux.currentMoment, { years: 1 });
    }

    if (flux.showYears) {
      // const moment = flux.currentMoment.subtract(16, 'Y');
      // flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }
  },
  increment() {
    if (flux.showMonths) {
      flux.currentMoment = add(flux.currentMoment, { years: 1 });
    }

    if (flux.showYears) {
      // const moment = flux.currentMoment.add(16, 'Y');
      // flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }
  },
  selectYear(val: number) {
    flux.showYears = false;
    flux.showMonths = true;
    flux.year = val;

    flux.currentMoment = setYear(flux.currentMoment, val);
  },
  selectMonth(month: number) {
    flux.currentMoment = setMonth(flux.currentMoment, month);
    flux.showDatePicker = false;

    const value = _format(flux.currentMoment, props.format);
    emit('update:value', value);
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
      :value="modelDate"
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
        class="fixed z-10 p-2 shadow-lg rounded bg-white dark:bg-slate-800"
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

          <div v-if="flux.showMonths">
            {{ _format(flux.currentMoment, 'yyyy') }}
          </div>

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
              'text-white bg-blue-400 important:hover:bg-blue-500': year === getYear(flux.now),
            }"
            @click="flux.selectYear(year)"
          >
            {{ year }}
          </div>
        </div>

        <div v-show="flux.showMonths" class="grid grid-cols-3 gap-1 text-center w-48">
          <div
            v-for="(month, index) in months"
            :key="month"
            :value="index"
            class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm cursor-pointer"
            :class="{
              'text-white bg-blue-400 important:hover:bg-blue-500':
                index === getMonth(flux.now) && getYear(flux.currentMoment) === getYear(flux.now),
              'text-white bg-primary-600 important:hover:bg-primary-700':
                modelDate &&
                index === getMonth(new Date(modelDate)) &&
                getYear(flux.currentMoment) === getYear(new Date(modelDate)),
            }"
            @click="flux.selectMonth(index)"
          >
            {{ month }}
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
