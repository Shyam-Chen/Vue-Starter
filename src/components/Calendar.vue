<script lang="ts" setup>
import type { PropType } from 'vue';
import { reactive, watch } from 'vue';
import { format, add, sub, getYear, setYear, getMonth, setMonth } from 'date-fns';
import chunk from 'lodash/chunk';
import range from 'lodash/range';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  currentMoment: {
    type: Date,
    default: () => new Date(),
  },
  format: {
    type: String,
    default: 'yyyy/MM/dd',
  },
  weekdays: {
    type: Array,
    default: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  months: {
    type: Array as PropType<string[]>,
    // prettier-ignore
    default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  startWeekOnSunday: {
    type: Boolean,
    default: true,
  },
  minDate: {
    type: String,
    default: undefined,
  },
  maxDate: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(['update:value']);

const createDays = (y?: number, m?: number) => {
  const currentPeriod = () => {
    const today = new Date();
    return [y || today.getFullYear(), m || today.getMonth()];
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
    day.today = format(day.date, props.format) === format(flux.now, props.format);
    day.selected = format(day.date, props.format) === props.value;

    if (props.minDate) {
      day.disabled = format(new Date(props.minDate), props.format) > format(day.date, props.format);
    }

    if (props.maxDate) {
      day.disabled = format(new Date(props.maxDate), props.format) < format(day.date, props.format);
    }
  });

  return chunk(days, 7);
};

const flux = reactive({
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
      // const moment = flux.currentMoment.subtract(16, 'Y');
      // flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }

    if (flux.showMonths) {
      // flux.currentMoment.subtract(1, 'Y');
      // flux.year = flux.currentMoment.year();
    }
  },
  increment() {
    if (flux.showWeeks) {
      flux.currentMoment = add(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      // const moment = flux.currentMoment.add(16, 'Y');
      // flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }

    if (flux.showMonths) {
      // flux.currentMoment.add(1, 'Y');
      // flux.year = flux.currentMoment.year();
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
    const date = format(val.date, props.format);

    if (
      props.minDate &&
      format(new Date(props.minDate), props.format) > format(val.date, props.format)
    )
      return;
    if (
      props.maxDate &&
      format(new Date(props.maxDate), props.format) < format(val.date, props.format)
    )
      return;

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

watch(
  () => flux.currentMoment,
  (val) => {
    flux.currentPeriodDates = createDays(getYear(val), getMonth(val));
  },
);

watch([() => props.value, () => props.minDate, () => props.maxDate], () => {
  flux.currentPeriodDates = createDays(getYear(flux.currentMoment), getMonth(flux.currentMoment));
});

flux.currentPeriodDates = createDays();
</script>

<template>
  <div class="p-2 shadow-lg rounded bg-white w-full">
    <div class="flex justify-between items-center mb-1">
      <div class="cursor-pointer hover:bg-slate-200 px-2 rounded">
        {{ format(flux.currentMoment, 'MMMM yyyy') }}
      </div>

      <div class="cursor-pointer hover:bg-slate-200 p-2 rounded-full" @click="flux.decrement">
        <div class="i-fa-chevron-left w-3 h-3"></div>
      </div>

      <div>Today</div>

      <div class="cursor-pointer hover:bg-slate-200 p-2 rounded-full" @click="flux.increment">
        <div class="i-fa-chevron-right w-3 h-3"></div>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center">
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
          class="flex flex-col hover:bg-slate-200 cursor-pointer w-full h-20 p-1 border-t-1"
          :class="{
            'text-white bg-blue-600 important:hover:bg-blue-700': item.selected,
            'text-slate-400 important:cursor-not-allowed': item.disabled,
            'text-white bg-blue-400 important:hover:bg-blue-500': item.today,
            'text-slate-400': item.outOfRange,
          }"
          @click="flux.selectDateItem(item)"
        >
          <div class="self-end">{{ item.date.getDate() }}</div>

          <div class="self-start flex items-center">
            <div class="i-fa-circle w-2 h-2 bg-red-500"></div>
            <div class="ml-1">New Event</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
