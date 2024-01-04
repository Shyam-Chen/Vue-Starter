<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch } from 'vue';
import { useLocale } from 'vue-localer';
import { onClickOutside } from '@vueuse/core';
import { format as _format, add, sub, getYear, setYear, getMonth, setMonth } from 'date-fns';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';

import TextField from '../text-field/TextField.vue';
import Fade from '../fade/Fade.vue';

const props = withDefaults(
  defineProps<{
    startValue?: string;
    endValue?: string;
    minMonth?: string | Date;
    maxMonth?: string | Date;
    format?: string;
  }>(),
  {
    startValue: '',
    endValue: '',
    minMonth: undefined,
    maxMonth: undefined,
    format: 'yyyy/MM',
  },
);

const emit = defineEmits<{
  (evt: 'update:startValue', val?: string): void;
  (evt: 'update:endValue', val?: string): void;
}>();

const locale = useLocale();

const target = ref();
const input = ref();
const picker = ref();

const startValueModel = computed({
  get: () => props.startValue,
  set: (val) => emit('update:startValue', val),
});

const endValueModel = computed({
  get: () => props.endValue,
  set: (val) => emit('update:endValue', val),
});

// prettier-ignore
const months = computed(() => locale.value?.months || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

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

    if (endValueModel.value) {
      flux.currentMoment = new Date(endValueModel.value);
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

  selectedRange: [] as any[],

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

    const value = _format(flux.currentMoment, props.format);

    if (props.minMonth && _format(new Date(props.minMonth), props.format) > value) return;
    if (props.maxMonth && _format(new Date(props.maxMonth), props.format) < value) return;

    if (flux.selectedRange.length === 0) {
      flux.selectedRange = [value];
    } else if (flux.selectedRange.length === 1) {
      flux.selectedRange = [...flux.selectedRange, value];
    } else if (flux.selectedRange.length === 2) {
      flux.selectedRange = [value];
    }

    const [startMonth, endMonth] = flux.selectedRange.sort();

    startValueModel.value = startMonth || '';
    endValueModel.value = endMonth || '';
  },
});

const rangeValue = computed(() => {
  if (startValueModel.value && !endValueModel.value) return startValueModel.value;

  if (startValueModel.value && endValueModel.value) {
    return `${startValueModel.value} ~ ${endValueModel.value}`;
  }

  return '';
});

watch(
  () => flux.showDatePicker,
  (val) => {
    if (!val && flux.selectedRange.length === 1) {
      const date = flux.selectedRange[0];
      flux.selectedRange = [date, date];
      startValueModel.value = date;
      endValueModel.value = date;
    }
  },
);

onClickOutside(target, () => {
  flux.showDatePicker = false;
});

useScrollParent(
  computed(() => picker.value),
  () => {
    if (flux.showDatePicker) flux.resizePanel();
  },
);

function monthDisabled(index: number) {
  const currentMonth = _format(new Date(getYear(flux.currentMoment), index), props.format);
  const minMonth = props.minMonth && _format(new Date(props.minMonth), props.format);
  const maxMonth = props.maxMonth && _format(new Date(props.maxMonth), props.format);

  if (minMonth && maxMonth) {
    return minMonth > currentMonth || maxMonth < currentMonth;
  } else if (minMonth) {
    return minMonth > currentMonth;
  } else if (maxMonth) {
    return maxMonth < currentMonth;
  }

  return false;
}
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      ref="input"
      v-bind="$attrs"
      :value="rangeValue"
      append="i-material-symbols-calendar-month-outline-rounded"
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
        class="fixed z-10 p-2 shadow-lg rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
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
              'ring-1 ring-primary-500':
                index === getMonth(flux.now) && getYear(flux.currentMoment) === getYear(flux.now),
              'text-slate-300 dark:text-slate-600 !cursor-not-allowed': monthDisabled(index),
              'text-white bg-primary-600 important:hover:bg-primary-700':
                (startValueModel &&
                  index === getMonth(new Date(startValueModel)) &&
                  getYear(flux.currentMoment) === getYear(new Date(startValueModel))) ||
                (startValueModel &&
                  endValueModel &&
                  startValueModel <=
                    _format(new Date(getYear(flux.currentMoment), index), props.format) &&
                  _format(new Date(getYear(flux.currentMoment), index), props.format) <=
                    endValueModel),
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
