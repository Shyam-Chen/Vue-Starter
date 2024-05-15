<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';
import { onClickOutside } from '@vueuse/core';
import {
  format as _format,
  intlFormat,
  add,
  sub,
  getYear,
  setYear,
  getMonth,
  setMonth,
} from 'date-fns';
import chunk from 'lodash/chunk';
import range from 'lodash/range';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';

import TextField from '../text-field/TextField.vue';
import Fade from '../fade/Fade.vue';

type Day = {
  date: Date;
  outOfRange?: boolean;
  today?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

const valueModel = defineModel<string>('value', { default: '' });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    minDate?: string | Date;
    maxDate?: string | Date;
    format?: string;
  }>(),
  {
    disabled: false,
    minDate: '',
    maxDate: '',
    format: 'yyyy/MM/dd',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'change', val: string): void;
  (evt: 'blur'): void;
}>();

const localer = useLocaler();
const locale = useLocale();

const _weekdays = computed(() => locale.value?.weekdays || ['S', 'M', 'T', 'W', 'T', 'F', 'S']);

// prettier-ignore
const _months = computed(
  () =>
    locale.value?.months || [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ],
);

const target = ref<HTMLDivElement>();
const input = ref<typeof TextField>();
const picker = ref<HTMLDivElement>();

const createDays = (y?: number, m?: number) => {
  const currentPeriod = () => {
    const today = new Date();
    return [y || today.getFullYear(), typeof m === 'number' ? m : today.getMonth()];
  };

  const [year, month] = currentPeriod();
  const days = [] as Day[];
  const date = new Date(year, month, 1);
  const offset =
    typeof locale.value?.startWeekOnMonday === 'boolean'
      ? locale.value?.startWeekOnMonday
        ? 0
        : 1
      : 1;

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

    const currentDate = _format(day.date, props.format);
    const minDate = props.minDate && _format(new Date(props.minDate), props.format);
    const maxDate = props.maxDate && _format(new Date(props.maxDate), props.format);

    if (props.minDate && props.maxDate) {
      day.disabled = minDate > currentDate || maxDate < currentDate;
    } else if (props.minDate) {
      day.disabled = minDate > currentDate;
    } else if (props.maxDate) {
      day.disabled = maxDate < currentDate;
    }

    day.selected = _format(day.date, props.format) === valueModel.value;
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
  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    const rect = input.value?.$el.querySelector('.TextField-Input').getBoundingClientRect();

    if (picker.value) {
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
    if (props.disabled) return;

    flux.showDatePicker = !flux.showDatePicker;
    focused.value = true;

    flux.showWeeks = true;
    flux.showYears = false;
    flux.showMonths = false;

    if (valueModel.value) {
      flux.currentMoment = new Date(valueModel.value);
    } else {
      flux.currentMoment = new Date();
    }

    nextTick(() => {
      if (flux.showDatePicker) flux.resizePanel();
    });
  },

  showWeeks: true,
  showYears: false,
  showMonths: false,

  now: new Date(),
  currentMoment: new Date(),
  currentPeriodDates: [] as Day[][],

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
  selectDateItem(val: Day) {
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
    emit('change', date);
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

const focused = ref(false);

watch(
  () => focused.value,
  (val) => {
    if (!val) emit('blur');
  },
);

onClickOutside(target, () => {
  flux.showDatePicker = false;
  focused.value = false;
});

watch(
  () => flux.currentMoment,
  (val) => {
    flux.currentPeriodDates = createDays(getYear(val), getMonth(val));
  },
);

watch([valueModel, () => props.minDate, () => props.maxDate], () => {
  flux.currentPeriodDates = createDays(getYear(flux.currentMoment), getMonth(flux.currentMoment));
});

flux.currentPeriodDates = createDays();

useScrollParent(
  computed(() => picker.value),
  () => {
    if (flux.showDatePicker) flux.resizePanel();
  },
);

function onKeydown(evt: KeyboardEvent) {
  if (['Space', 'Enter'].includes(evt.code)) {
    evt.preventDefault();
    flux.openPicker();
  }

  if (evt.code === 'Escape') {
    flux.showDatePicker = false;
  }

  if (evt.code === 'Tab') {
    input.value?.$el.querySelector('.TextField-Input').blur();
    flux.showDatePicker = false;
    focused.value = false;
  }
}
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      ref="input"
      v-bind="$attrs"
      :value="valueModel"
      :disabled="disabled"
      append="i-material-symbols-calendar-today-outline-rounded"
      readonly
      @clear="valueModel = ''"
      @focus="focused = true"
      @click="flux.openPicker"
      @append="flux.openPicker"
      @keydown="onKeydown"
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
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-1 rounded-full"
            @click="flux.decrement"
          >
            <div class="i-material-symbols-chevron-left-rounded w-4 h-4"></div>
          </div>

          <div
            v-if="flux.showWeeks"
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 px-2 rounded"
            @click="flux.changeYearMonth"
          >
            {{
              localer.lang.value
                ? intlFormat(
                    flux.currentMoment,
                    { year: 'numeric', month: 'short' },
                    { locale: localer.lang.value },
                  )
                : _format(flux.currentMoment, 'MMM yyyy')
            }}
          </div>

          <div v-if="flux.showYears">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>
          <div v-if="flux.showMonths">{{ _format(flux.currentMoment, 'yyyy') }}</div>

          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-1 rounded-full"
            @click="flux.increment"
          >
            <div class="i-material-symbols-chevron-right-rounded w-4 h-4"></div>
          </div>
        </div>

        <div v-show="flux.showWeeks" class="grid grid-cols-7 grid-rows-7 text-center gap-y-0.5">
          <div
            v-for="(weekday, weekdayIndex) in _weekdays"
            :key="weekdayIndex"
            class="flex justify-center items-center text-sm font-bold w-6 h-6 p-4"
          >
            {{ weekday }}
          </div>

          <template v-for="(week, weekIndex) in flux.currentPeriodDates">
            <div
              v-for="(item, idx) in week"
              :key="`${weekIndex}-${idx}`"
              class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full w-6 h-6 p-4 text-sm cursor-pointer"
              :class="{
                'text-white bg-primary-600 !hover:bg-primary-700': item.selected,
                'text-slate-300 dark:text-slate-600 !cursor-not-allowed': item.disabled,
                'ring-1 ring-primary-500': item.today,
                invisible: item.outOfRange,
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
              'ring-1 ring-primary-500': year === getYear(flux.now),
            }"
            @click="flux.selectYear(year)"
          >
            {{ year }}
          </div>
        </div>

        <div v-show="flux.showMonths" class="grid grid-cols-3 gap-1 text-center w-48">
          <div
            v-for="(month, index) in _months"
            :key="month"
            :value="index"
            class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm cursor-pointer"
            :class="{
              'ring-1 ring-primary-500':
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
