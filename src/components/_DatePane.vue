<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { format, add, sub, getYear, setYear, getMonth, setMonth } from 'date-fns';
import chunk from 'lodash/chunk';
import range from 'lodash/range';

const props = defineProps({
  value: {
    type: String,
    default: '',
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
    type: Array,
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

  yearRange: [],
  year: null,
  months: [],
  month: null,

  decrement() {
    if (flux.showWeeks) {
      flux.currentMoment = sub(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      const moment = flux.currentMoment.subtract(16, 'Y');
      flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }

    if (flux.showMonths) {
      flux.currentMoment.subtract(1, 'Y');
      flux.year = flux.currentMoment.year();
    }
  },
  increment() {
    if (flux.showWeeks) {
      flux.currentMoment = add(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      const moment = flux.currentMoment.add(16, 'Y');
      flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }

    if (flux.showMonths) {
      flux.currentMoment.add(1, 'Y');
      flux.year = flux.currentMoment.year();
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
  selectDateItem(val) {
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
  selectYear(val) {
    flux.showYears = false;
    flux.showMonths = true;
    flux.year = val;

    flux.currentMoment = setYear(flux.currentMoment, val);
  },
  selectMonth(val) {
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
  <div class="date-picker p-2 shadow-lg rounded bg-white">
    <div class="date-picker-header mb-1">
      <div class="i-fa-chevron-left w-4 h-4" @click="flux.decrement"></div>

      <div
        v-if="flux.showWeeks"
        class="date-picker-header-controller d-flex"
        @click="flux.changeYearMonth"
      >
        <div class="ml-2">
          {{ getYear(flux.currentMoment) }} / {{ getMonth(flux.currentMoment) + 1 }}
        </div>
      </div>

      <div
        v-if="flux.showYears"
        class="date-picker-header-controller d-flex"
        style="cursor: initial"
      >
        <div class="ml-2">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>
      </div>

      <div
        v-if="flux.showMonths"
        class="date-picker-header-controller d-flex"
        style="cursor: initial"
      >
        <div class="ml-2">
          {{ flux.year }}
        </div>
      </div>

      <div class="i-fa-chevron-right w-4 h-4" @click="flux.increment"></div>
    </div>

    <div v-show="flux.showWeeks" class="date-picker-weeks">
      <div class="flex">
        <div
          v-for="(weekday, weekdayIndex) in weekdays"
          :key="weekdayIndex"
          class="date-picker-weekday"
        >
          {{ weekday }}
        </div>
      </div>

      <div v-for="(week, weekIndex) in flux.currentPeriodDates" :key="weekIndex" class="flex">
        <div
          v-for="item in week"
          :key="item"
          class="date-picker-day"
          :class="{
            selectable: item.disabled,
            selected: item.selected,
            disabled: item.disabled,
            today: item.today,
            outOfRange: item.outOfRange,
            holiday: item.holiday,
          }"
          @click="flux.selectDateItem(item)"
        >
          <div class="date-picker-day-layer">
            <div class="date-picker-day-highlight" />
          </div>

          <div class="date-picker-day-text">
            {{ item.date.getDate() }}
          </div>
        </div>
      </div>
    </div>

    <div v-show="flux.showYears" class="date-picker-years">
      <div
        v-for="year in flux.yearRange"
        :key="year"
        :value="year"
        class="date-picker-year"
        :class="{ selected: year === flux.now.getFullYear() }"
        @click="flux.selectYear(year)"
      >
        {{ year }}
      </div>
    </div>

    <div v-show="flux.showMonths" class="date-picker-months">
      <div
        v-for="(month, index) in months"
        :key="month"
        :value="index"
        class="date-picker-month"
        :class="{ selected: index === flux.now.getMonth() && flux.year === flux.now.getFullYear() }"
        @click="flux.selectMonth(index)"
      >
        {{ month }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-picker {
  box-sizing: border-box;
  // background: #e4ebf0;
  // border: 0.0625rem solid #d1d9e6;
  border-radius: 0.55rem;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff;
  transform: translateY(0) translateY(8px) translateY(0);

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 6px 0;
  }

  &-header-controller {
    cursor: pointer;
  }

  &-weekday {
    font-size: 14px;
    color: #6c757d;
    width: 28px;
  }

  &-weeks {
    display: grid;
    // grid-template-columns: repeat(7, 1fr);
    // padding: 6px;
    box-sizing: border-box;
    text-align: center;
    // min-height: 213px;
    justify-content: center;
    align-items: center;
  }

  &-day {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: 50% 50%;
    height: 30px;

    &.holiday {
      & .date-picker-day-highlight {
        background: #f2d6d6;
      }

      & .date-picker-day-text {
        color: #742a2a;
      }
    }

    &.today {
      & .date-picker-day-highlight {
        background: #c8e2f7;
      }

      & .date-picker-day-text {
        color: #2a4365;
      }
    }

    &.selected {
      & .date-picker-day-highlight {
        background: blue;
      }

      & .date-picker-day-text {
        color: #fff;
      }
    }

    &.outOfRange {
      // & .date-picker-day-highlight {
      //   background: #fff;
      // }

      & .date-picker-day-text {
        color: #c7c7c7;
      }
    }

    &.disabled {
      & .date-picker-day-highlight {
        cursor: not-allowed;
        // background: #fff;
      }

      & .date-picker-day-text {
        cursor: not-allowed;
        color: #c7c7c7;
      }
    }
  }

  &-day-layer {
    cursor: pointer;
    z-index: 10;
  }

  &-day-highlight {
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }

  &-day-text {
    cursor: pointer;
    position: absolute;
    color: #222;
    z-index: 20;
  }

  &-years {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3px;
    padding: 6px;
    box-sizing: border-box;
    text-align: center;
    // min-height: 213px;
  }

  &-year {
    box-sizing: border-box;
    cursor: pointer;
    align-self: center;
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;

    // &.selected {
    //   border: 1px solid #2a4365;
    //   border-radius: 2rem;
    // }
  }

  &-months {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
    padding: 6px;
    box-sizing: border-box;
    text-align: center;
    // min-height: 213px;
  }

  &-month {
    box-sizing: border-box;
    cursor: pointer;
    align-self: center;
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;

    // &.selected {
    //   border: 1px solid #2a4365;
    //   border-radius: 2rem;
    // }
  }
}
</style>
