<script lang="ts" setup>
import { ref, computed, reactive, watch } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';
import * as d from 'date-fns';
import chunk from 'lodash/chunk';
import range from 'lodash/range';

import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';
import Popover from '../popover/Popover.vue';
import TextField from '../text-field/TextField.vue';

type Day = {
  date: Date;
  outOfRange?: boolean;
  today?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string>('value', { default: '' });

const props = withDefaults(
  defineProps<
    {
      disabled?: boolean;
      minDate?: string | Date;
      maxDate?: string | Date;
      format?: string;
    } & FormControlProps
  >(),
  {
    disabled: false,
    minDate: '',
    maxDate: '',
    format: 'yyyy/MM/dd',
    ...formControlDefaults,
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

const input = ref<typeof TextField>();

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
    day.today = d.format(day.date, props.format) === d.format(flux.now, props.format);

    const currentDate = d.format(day.date, props.format);
    const minDate = props.minDate && d.format(new Date(props.minDate), props.format);
    const maxDate = props.maxDate && d.format(new Date(props.maxDate), props.format);

    if (props.minDate && props.maxDate) {
      day.disabled = minDate > currentDate || maxDate < currentDate;
    } else if (props.minDate) {
      day.disabled = minDate > currentDate;
    } else if (props.maxDate) {
      day.disabled = maxDate < currentDate;
    }

    day.selected = d.format(day.date, props.format) === valueModel.value;
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

  openPicker() {
    if (props.disabled) return;

    flux.showDatePicker = !flux.showDatePicker;

    flux.showWeeks = true;
    flux.showYears = false;
    flux.showMonths = false;

    if (valueModel.value) {
      flux.currentMoment = new Date(valueModel.value);
    } else {
      flux.currentMoment = new Date();
    }
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
      flux.currentMoment = d.sub(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      flux.currentMoment = d.sub(flux.currentMoment, { years: 16 });
      const currentYear = d.getYear(flux.currentMoment);
      flux.yearRange = range(currentYear - 5, currentYear + 11);
    }

    if (flux.showMonths) {
      flux.currentMoment = d.sub(flux.currentMoment, { years: 1 });
    }
  },
  increment() {
    if (flux.showWeeks) {
      flux.currentMoment = d.add(flux.currentMoment, { months: 1 });
    }

    if (flux.showYears) {
      flux.currentMoment = d.add(flux.currentMoment, { years: 16 });
      const currentYear = d.getYear(flux.currentMoment);
      flux.yearRange = range(currentYear - 5, currentYear + 11);
    }

    if (flux.showMonths) {
      flux.currentMoment = d.add(flux.currentMoment, { years: 1 });
    }
  },
  changeYearMonth() {
    if (flux.showWeeks) {
      flux.showWeeks = false;
      flux.showYears = true;
      const currentYear = d.getYear(flux.currentMoment);
      flux.yearRange = range(currentYear - 5, currentYear + 11);
    }
  },
  selectDateItem(val: Day) {
    const date = d.format(val.date, props.format);

    if (
      props.minDate &&
      d.format(new Date(props.minDate), props.format) > d.format(val.date, props.format)
    ) {
      return;
    }

    if (
      props.maxDate &&
      d.format(new Date(props.maxDate), props.format) < d.format(val.date, props.format)
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

    flux.currentMoment = d.setYear(flux.currentMoment, val);
  },
  selectMonth(val: number) {
    flux.showMonths = false;
    flux.showWeeks = true;
    flux.month = val;
    flux.currentMoment = d.setMonth(flux.currentMoment, val);

    flux.currentPeriodDates = createDays(
      d.getYear(flux.currentMoment),
      d.getMonth(flux.currentMoment),
    );
  },
});

watch(
  () => flux.showDatePicker,
  (val) => {
    if (!val) {
      emit('blur');
    }
  },
);

watch(
  () => flux.currentMoment,
  (val) => {
    flux.currentPeriodDates = createDays(d.getYear(val), d.getMonth(val));
  },
);

watch([valueModel, () => props.minDate, () => props.maxDate], () => {
  flux.currentPeriodDates = createDays(
    d.getYear(flux.currentMoment),
    d.getMonth(flux.currentMoment),
  );
});

flux.currentPeriodDates = createDays();

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
  }
}
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <Popover v-model="flux.showDatePicker" start class="w-full">
        <TextField
          :id
          ref="input"
          v-bind="$attrs"
          label=""
          :required="false"
          :invalid="!!invalid"
          help=""
          :value="valueModel"
          :disabled
          append="i-material-symbols-calendar-today-outline-rounded"
          readonly
          @clear="valueModel = ''"
          @click="flux.openPicker"
          @append="flux.openPicker"
          @keydown="onKeydown"
        />

        <template #content>
          <div
            v-if="flux.showDatePicker"
            class="p-2 shadow-lg rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
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
                    ? d.intlFormat(
                        flux.currentMoment,
                        { year: 'numeric', month: 'short' },
                        { locale: localer.lang.value },
                      )
                    : d.format(flux.currentMoment, 'MMM yyyy')
                }}
              </div>

              <div v-if="flux.showYears">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>
              <div v-if="flux.showMonths">{{ d.format(flux.currentMoment, 'yyyy') }}</div>

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
                  'ring-1 ring-primary-500': year === d.getYear(flux.now),
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
                    index === d.getMonth(flux.now) && flux.year === d.getYear(flux.now),
                }"
                @click="flux.selectMonth(index)"
              >
                {{ month }}
              </div>
            </div>
          </div>
        </template>
      </Popover>
    </template>
  </FormControl>
</template>
