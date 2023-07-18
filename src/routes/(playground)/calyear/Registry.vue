<script lang="ts" setup>
import { reactive } from 'vue';
import { format, getYear } from 'date-fns';
import chunk from 'lodash/chunk';
import range from 'lodash/range';

defineRegistry({
  layout: 'Empty',
});

const fmt = 'yyyy/MM/dd';

const flux = reactive({
  now: new Date(),
  currentMoment: new Date(),
  allPeriodDates: [] as any[],
});

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// prettier-ignore
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

  const daysWithHoliday = days
    .reduce((resultArray: any[], item, index) => {
      const chunkIndex = Math.floor(index / 7);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, [])
    .map((chunk: any[]) =>
      chunk.map((item, index) => ({ ...item, holiday: index === 0 || index === 6 })),
    )
    .flat();

  daysWithHoliday.forEach((day) => {
    day.today = format(day.date, fmt) === format(flux.now, fmt);
  });

  return chunk(daysWithHoliday, 7);
};

const ranged = range(0, 12);

for (let i = 0; i < ranged.length; i++) {
  const month = ranged[i];

  flux.allPeriodDates = [...flux.allPeriodDates, createDays(getYear(flux.currentMoment), month)];
}
</script>

<template>
  <div class="my-4">
    <div class="text-3xl font-bold">Calyear</div>
  </div>

  <div class="my-4">
    {{ format(flux.currentMoment, 'yyyy') }}
  </div>

  <div class="flex">
    <div class="flex flex-col">
      <div class="p-1 border flex-1"></div>
      <div v-for="month in months" :key="month" class="p-1 border">{{ month }}</div>
    </div>

    <div>
      <div class="grid grid-cols-6">
        <div v-for="num in 6" :key="num" class="grid grid-cols-7">
          <div
            v-for="(weekday, weekdayIndex) in weekdays"
            :key="weekdayIndex"
            class="text-slate-600 text-center py-1 border bg-slate-300"
          >
            {{ weekday }}
          </div>
        </div>
      </div>

      <div v-for="(periodDates, periodDatesIdx) in flux.allPeriodDates" :key="periodDatesIdx">
        <div class="grid grid-cols-6">
          <div v-for="(week, weekIndex) in periodDates" :key="weekIndex" class="grid grid-cols-7">
            <div
              v-for="item in week"
              :key="weekIndex + item"
              class="flex hover:bg-slate-200 dark:hover:bg-slate-600 w-full p-1 gap-1 border dark:border-slate-600"
              :class="{
                'text-white bg-blue-600 important:hover:bg-blue-700': item.selected,
                'text-slate-400 important:cursor-not-allowed': item.disabled,
                'text-slate-400': item.outOfRange,
                'text-red-500': item.holiday,
              }"
            >
              <div
                v-if="!item.outOfRange"
                class="self-end rounded-full"
                :class="{
                  'px-2': String(item.date.getDate()).length === 1,
                  'px-1': String(item.date.getDate()).length === 2,
                  'text-white bg-blue-400 important:hover:bg-blue-500': item.today,
                }"
              >
                {{ item.date.getDate() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
