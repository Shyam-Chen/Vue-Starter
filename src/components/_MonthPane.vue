<template>
  <div class="date-picker p-2">
    <div class="date-picker-header mb-1">
      <span class="date-picker-header-controller fa fa-chevron-left" @click="flux.decrement" />

      <div class="date-picker-header-controller d-flex" @click="flux.changeYearMonth">
        <div class="ml-2">
          {{ flux.currentMoment.year() }} / {{ flux.currentMoment.month() + 1 }}
        </div>
      </div>

      <span class="date-picker-header-controller fa fa-chevron-right" @click="flux.increment" />
    </div>

    <div v-show="flux.showWeeks" class="date-picker-weeks">
      <div class="d-flex">
        <div
          v-for="(weekday, weekdayIndex) in ['日', '一', '二', '三', '四', '五', '六']"
          :key="weekdayIndex"
          class="date-picker-weekday"
        >
          {{ weekday }}
        </div>
      </div>

      <div v-for="(week, weekIndex) in flux.currentPeriodDates" :key="weekIndex" class="d-flex">
        <div
          v-for="item in week"
          :key="item.dateKey"
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
        :class="{ selected: year === flux.currentMoment.year() }"
        @click="flux.selectYear(year)"
      >
        {{ year }}
      </div>
    </div>

    <div v-show="flux.showMonths" class="date-picker-months">
      <div
        v-for="(month, index) in flux.months"
        :key="month"
        :value="index"
        class="date-picker-month"
        :class="{ selected: index === flux.currentMoment.month() }"
        @click="flux.selectMonth(index)"
      >
        {{ month }}
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, watch } from '@nuxtjs/composition-api';

function chunkArray(inputArray, chunkSize) {
  const results = [];

  while (inputArray.length) {
    results.push(inputArray.splice(0, chunkSize));
  }

  return results;
}

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    weekdays: {
      type: Array,
      default: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    },
    months: {
      type: Array,
      default: () => [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ],
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
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { proxy: vm } = getCurrentInstance();

    const now = vm.$moment();

    const createDays = (y, m) => {
      const currentPeriod = () => {
        const today = new Date();
        return [y || today.getFullYear(), m || today.getMonth()];
      };

      const [year, month] = currentPeriod();
      const days = [];
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
        day.today = vm.$moment(day.date).format('YYYY/MM/DD') === now.format('YYYY/MM/DD');
        day.selected = vm.$moment(day.date).format('YYYY/MM/DD') === props.value;
      });

      return chunkArray(days, 7);
    };

    const flux = reactive({
      showWeeks: true,
      showYears: false,
      showMonths: false,

      currentMoment: vm.$moment(),

      yearRange: [],
      months: [],

      weekdaysSorted: [],
      currentPeriodDates: [],

      decrement() {
        flux.currentMoment.subtract(1, 'M');
        flux.currentPeriodDates = createDays(flux.currentMoment.year(), flux.currentMoment.month());
      },
      increment() {
        flux.currentMoment.add(1, 'M');
        flux.currentPeriodDates = createDays(flux.currentMoment.year(), flux.currentMoment.month());
      },
      changeYearMonth() {},
      selectDateItem(val) {
        const date = vm.$moment(val.date).format('YYYY/MM/DD');
        emit('input', date);
      },
      selectYear() {},
      selectMonth() {},
    });

    watch(
      () => props.value,
      () => {
        flux.currentPeriodDates = createDays(flux.currentMoment.year(), flux.currentMoment.month());
      },
    );

    flux.currentPeriodDates = createDays();

    return {
      flux,
    };
  },
};
</script>

<style lang="scss" scoped>
.date-picker {
  box-sizing: border-box;
  background: #e4ebf0;
  border: 0.0625rem solid #d1d9e6;
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
        background: var(--primary);
      }

      & .date-picker-day-text {
        color: #fff;
      }
    }

    &.outOfRange {
      & .date-picker-day-highlight {
        background: #fff;
      }

      & .date-picker-day-text {
        color: #c7c7c7;
      }
    }

    &.disabled {
      & .date-picker-day-highlight {
        cursor: not-allowed;
        background: #fff;
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
    min-height: 213px;
  }

  &-year {
    box-sizing: border-box;
    cursor: pointer;
    align-self: center;

    &.selected {
      border: 1px solid #2a4365;
      border-radius: 1rem;
    }
  }

  &-months {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
    padding: 6px;
    box-sizing: border-box;
    text-align: center;
    min-height: 213px;
  }

  &-month {
    box-sizing: border-box;
    cursor: pointer;
    align-self: center;

    &.selected {
      border: 1px solid #2a4365;
      border-radius: 1rem;
    }
  }
}
</style>
