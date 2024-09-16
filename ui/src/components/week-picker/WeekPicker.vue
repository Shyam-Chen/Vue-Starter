<script lang="ts" setup>
import { nextTick, ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import * as d from 'date-fns';
import chunk from 'lodash/chunk';

import Fade from '../fade/Fade.vue';
import TextField from '../text-field/TextField.vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';

const valueModel = defineModel<string>('value', { default: '' });

const emit = defineEmits<{
  (evt: 'change', val: string, startDate?: Date, endDate?: Date): void;
}>();

const target = ref<HTMLDivElement>();
const input = ref<typeof TextField>();
const picker = ref<HTMLDivElement>();

const currentMoment = ref(new Date());
const show = ref(false);
const direction = ref<'down' | 'up'>('down');

const createWeeks = (y?: number, m?: number) => {
  const currentPeriod = () => {
    const today = new Date();
    return [y || today.getFullYear(), typeof m === 'number' ? m : today.getMonth()];
  };

  const [year, month] = currentPeriod();

  const days = [] as Array<{ date?: Date; outOfRange?: boolean; week?: number; today?: boolean }>;

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

  for (const day of days) {
    if (day.date) {
      day.today = d.format(day.date, 'yyyy/MM/dd') === d.format(new Date(), 'yyyy/MM/dd');
    }
  }

  return chunk(days, 7).map((week) => [{ week: d.getISOWeek(week[6].date || 0) }, ...week]);
};

const weeks = ref(createWeeks(d.getYear(currentMoment.value), d.getMonth(currentMoment.value)));

const weekdays = ['Week', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];

type Week = Array<{ date?: Date; outOfRange?: boolean; week?: number }>;

function resizePanel() {
  if (input.value && picker.value) {
    const rect = input.value.$el.querySelector('.TextField-Input').getBoundingClientRect();

    picker.value.style.left = `${rect.left}px`;

    const center = window.innerHeight / 2;

    if (rect.top > center) {
      picker.value.style.top = `${rect.top}px`;
      direction.value = 'up';
    } else {
      picker.value.style.top = `${rect.bottom}px`;
      direction.value = 'down';
    }
  }
}

function openPicker() {
  show.value = true;

  nextTick(() => {
    resizePanel();
  });
}

function decrement() {
  currentMoment.value = d.sub(currentMoment.value, { months: 1 });
  weeks.value = createWeeks(d.getYear(currentMoment.value), d.getMonth(currentMoment.value));
}

function increment() {
  currentMoment.value = d.add(currentMoment.value, { months: 1 });
  weeks.value = createWeeks(d.getYear(currentMoment.value), d.getMonth(currentMoment.value));
}

function selectWeek(week: Week) {
  const isoWeek = week[0].week;
  const start = week[1].date && d.getYear(week[1].date);
  const end = week[7].date && d.getYear(week[7].date);

  let year = end;
  if (week[0].week === 52) year = start;

  valueModel.value = `${year}-W${isoWeek}`;
  emit('change', valueModel.value, week[1].date, week[7].date);

  show.value = false;
}

const isCurrentWeek = (week: Week) => {
  const isoWeek = week[0].week;
  const start = week[1].date && d.getYear(week[1].date);
  const end = week[7].date && d.getYear(week[7].date);

  let year = end;
  if (week[0].week === 52) year = start;

  const [currentYear, currentWeek] = valueModel.value.split('-W');
  return year === Number(currentYear) && isoWeek === Number(currentWeek);
};

const weekify = computed(() => {
  if (valueModel.value) {
    const [year, isoWeek] = valueModel.value.split('-W');
    const start = d.setWeek(d.nextSunday(new Date(Number(year), 0, 4)), Number(isoWeek));
    const end = d.setWeek(d.nextSaturday(new Date(Number(year), 0, 4)), Number(isoWeek));
    return `${valueModel.value} (${d.format(start, 'MM/dd')} ~ ${d.format(end, 'MM/dd')})`;
  }

  return valueModel.value;
});

onClickOutside(target, () => {
  show.value = false;
});

useScrollParent(
  computed(() => picker.value),
  () => {
    if (show.value) resizePanel();
  },
);
</script>

<template>
  <div ref="target" class="week-picker w-full">
    <TextField
      ref="input"
      v-bind="$attrs"
      :value="weekify"
      append="i-mdi-calendar-week"
      readonly
      @focus="openPicker"
      @append="openPicker"
    >
      <slot></slot>
    </TextField>

    <Fade>
      <div
        v-if="show"
        ref="picker"
        class="week-picker-panel fixed z-101 p-2 shadow-lg rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
        :class="{ 'week-picker-panel-up': direction === 'up' }"
      >
        <div class="flex justify-between items-center mb-1">
          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="decrement"
          >
            <div class="i-fa-chevron-left w-3 h-3"></div>
          </div>

          <div class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 px-2 rounded">
            {{ d.format(currentMoment, 'MMM yyyy') }}
          </div>

          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="increment"
          >
            <div class="i-fa-chevron-right w-3 h-3"></div>
          </div>
        </div>

        <div class="space-y-1">
          <div class="grid grid-cols-8 gap-1 text-center">
            <div
              v-for="(weekday, weekdayIndex) in weekdays"
              :key="weekdayIndex"
              class="flex justify-center items-center text-sm font-bold w-6 h-6 p-4"
            >
              {{ weekday }}
            </div>
          </div>

          <div
            v-for="(week, weekIndex) in weeks"
            :key="weekIndex"
            class="grid grid-cols-8 gap-1 text-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg cursor-pointer"
            :class="{ 'text-white bg-primary-600 !hover:bg-primary-700': isCurrentWeek(week) }"
            @click="selectWeek(week)"
          >
            <div
              v-for="(item, idx) in week"
              :key="idx"
              class="flex justify-center items-center rounded-full size-6 p-4 text-sm"
              :class="{
                'font-bold': item.week,
                'text-slate-600': item.outOfRange,
                'ring-1 ring-primary-500': item.today,
              }"
            >
              {{ item.week ? item.week : item.date?.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.week-picker-panel {
  transform: translateY(0.5rem);
}

.week-picker-panel-up {
  transform: translateY(-0.5rem) translateY(-100%);
}
</style>
