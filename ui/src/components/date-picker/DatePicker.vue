<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { format as _format, add, sub, getYear, setYear, getMonth, setMonth } from 'date-fns';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId';

import getScrollableParent from '~/utilities/getScrollableParent';

import TextField from '../text-field/TextField.vue';
import Fade from '../fade/Fade.vue';

const props = withDefaults(
  defineProps<{
    value?: string;
    disabled?: boolean;
    errorMessage?: string;
    format?: string;
    weekdays?: string[];
    months?: string[];
    startWeekOnMonday?: boolean;
    minDate?: string;
    maxDate?: string;
  }>(),
  {
    value: '',
    errorMessage: '',
    format: 'yyyy/MM/dd',
    weekdays: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    // prettier-ignore
    months: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    minDate: '',
    maxDate: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
}>();

const uid = uniqueId('date-picker-');

const target = ref();
const input = ref();
const picker = ref();

const modelDate = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});

const createDays = (y?: number, m?: number) => {
  const currentPeriod = () => {
    const today = new Date();
    return [y || today.getFullYear(), typeof m === 'number' ? m : today.getMonth()];
  };

  const [year, month] = currentPeriod();
  const days = [] as Array<{
    date: Date;
    outOfRange?: boolean;
    today?: boolean;
    selected?: boolean;
    disabled?: boolean;
  }>;
  const date = new Date(year, month, 1);
  const offset = 1;

  const startDay = date.getDay() || 7;

  if (startDay > 1 - offset) {
    for (let i = startDay - (2 - offset); i >= 0; i--) {
      const prevDate = new Date(date);
      prevDate.setDate(-i);
      days.push({ outOfRange: true, date: prevDate });
    }
  }

  while (date.getMonth() === month) {
    days.push({ date: new Date(date) });
    date.setDate(date.getDate() + 1);
  }

  const daysLeft = 7 - (days.length % 7);

  for (let i = 1; i <= daysLeft; i++) {
    const nextDate = new Date(date);
    nextDate.setDate(i);
    days.push({ outOfRange: true, date: nextDate });
  }

  days.forEach((day) => {
    day.today = _format(day.date, props.format) === _format(flux.now, props.format);
    day.selected = _format(day.date, props.format) === props.value;

    if (props.minDate) {
      day.disabled =
        _format(new Date(props.minDate), props.format) > _format(day.date, props.format);
    }

    if (props.maxDate) {
      day.disabled =
        _format(new Date(props.maxDate), props.format) < _format(day.date, props.format);
    }
  });

  const chunked = chunk(days, 7);

  if (chunked[0].every((day) => day.outOfRange)) {
    chunked.splice(0, 1);
  }

  if (chunked[chunked.length - 1].every((day) => day.outOfRange)) {
    chunked.splice(chunked.length - 1, 1);
  }

  return chunked;
};

const flux = reactive({
  showDatePicker: false,
  scrollableParent: null as HTMLElement | null,
  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    const rect = input.value.$el.querySelector('.text-field-input').getBoundingClientRect();

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
    if (props.disabled) return;

    flux.showDatePicker = true;

    flux.showWeeks = true;
    flux.showYears = false;
    flux.showMonths = false;

    if (modelDate.value) {
      flux.currentMoment = new Date(modelDate.value);
    } else {
      flux.currentMoment = new Date();
    }

    nextTick(() => {
      flux.scrollableParent = getScrollableParent(picker.value);
      flux.resizePanel();
    });
  },

  showWeeks: true,
  showYears: false,
  showMonths: false,

  now: new Date(),
  currentMoment: new Date(),
  currentPeriodDates: [] as any[],

  yearRange: [] as number[],
  year: null as null | number,
  months: [] as string[],
  month: null as null | number,

  decrement() {
    if (flux.showWeeks) {
      flux.currentMoment = sub(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      flux.currentMoment = sub(flux.currentMoment, { years: 16 });
      const currentYear = getYear(flux.currentMoment);
      flux.yearRange = range(currentYear - 5, currentYear + 11);
    }

    if (flux.showMonths) {
      flux.currentMoment = sub(flux.currentMoment, { years: 1 });
    }
  },
  increment() {
    if (flux.showWeeks) {
      flux.currentMoment = add(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      flux.currentMoment = add(flux.currentMoment, { years: 16 });
      const currentYear = getYear(flux.currentMoment);
      flux.yearRange = range(currentYear - 5, currentYear + 11);
    }

    if (flux.showMonths) {
      flux.currentMoment = add(flux.currentMoment, { years: 1 });
    }
  },
  changeYearMonth() {
    if (flux.showWeeks) {
      flux.showWeeks = false;
      flux.showYears = true;
      const currentYear = getYear(flux.currentMoment);
      flux.yearRange = range(currentYear - 5, currentYear + 11);
    }
  },
  selectDateItem(val: any) {
    const date = _format(val.date, props.format);

    if (
      props.minDate &&
      _format(new Date(props.minDate), props.format) > _format(val.date, props.format)
    ) {
      return;
    }

    if (
      props.maxDate &&
      _format(new Date(props.maxDate), props.format) < _format(val.date, props.format)
    ) {
      return;
    }

    flux.showDatePicker = false;
    emit('update:value', date);
  },
  selectYear(val: number) {
    flux.showYears = false;
    flux.showMonths = true;
    flux.year = val;

    flux.currentMoment = setYear(flux.currentMoment, val);
  },
  selectMonth(val: number) {
    flux.showMonths = false;
    flux.showWeeks = true;
    flux.month = val;
    flux.currentMoment = setMonth(flux.currentMoment, val);

    flux.currentPeriodDates = createDays(getYear(flux.currentMoment), getMonth(flux.currentMoment));
  },
});

const handleScroll = () => {
  if (flux.showDatePicker) {
    flux.resizePanel();
  }
};

onClickOutside(target, () => {
  flux.showDatePicker = false;
});

watch(
  () => flux.currentMoment,
  (val) => {
    flux.currentPeriodDates = createDays(getYear(val), getMonth(val));
  },
);

watch([() => props.value, () => props.minDate, () => props.maxDate], () => {
  flux.currentPeriodDates = createDays(getYear(flux.currentMoment), getMonth(flux.currentMoment));
});

watch(
  () => flux.scrollableParent,
  (el) => {
    el?.addEventListener('scroll', handleScroll);
  },
);

flux.currentPeriodDates = createDays();

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
      v-bind="$attrs"
      :value="modelDate"
      :errorMessage="errorMessage"
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

          <div
            v-if="flux.showWeeks"
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 px-2 rounded"
            @click="flux.changeYearMonth"
          >
            {{ _format(flux.currentMoment, 'MMM yyyy') }}
          </div>

          <div v-if="flux.showYears">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>
          <div v-if="flux.showMonths">{{ _format(flux.currentMoment, 'yyyy') }}</div>

          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="flux.increment"
          >
            <div class="i-fa-chevron-right w-3 h-3"></div>
          </div>
        </div>

        <div v-show="flux.showWeeks" class="grid grid-cols-7 gap-1 text-center">
          <div
            v-for="(weekday, weekdayIndex) in weekdays"
            :key="weekdayIndex"
            class="text-sm text-slate-600"
          >
            {{ weekday }}
          </div>

          <template v-for="(week, weekIndex) in flux.currentPeriodDates">
            <div
              v-for="item in week"
              :key="weekIndex + item"
              class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full w-6 h-6 text-sm cursor-pointer"
              :class="{
                'text-white bg-primary-600 important:hover:bg-primary-700': item.selected,
                'text-slate-400 important:cursor-not-allowed': item.disabled,
                'text-white bg-blue-400 important:hover:bg-blue-500': item.today,
                'text-slate-400 dark:text-slate-600': item.outOfRange,
              }"
              @click="flux.selectDateItem(item)"
            >
              {{ item.date.getDate() }}
            </div>
          </template>
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
                index === getMonth(flux.now) && flux.year === getYear(flux.now),
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
