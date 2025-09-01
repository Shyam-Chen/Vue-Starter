<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import * as d from 'date-fns';
import range from 'lodash/range';
import { inject, ref } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';

import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';
import Popover from '../popover/Popover.vue';
import TextField from '../text-field/TextField.vue';

const valueModel = defineModel<number | string | null>('value');

const props = withDefaults(
  defineProps<
    {
      disabled?: boolean;
      min?: number | string;
      max?: number | string;
    } & FormControlProps
  >(),
  {
    disabled: false,
    min: undefined,
    max: undefined,
    ...formControlDefaults,
  },
);

const status = ref(false);
const now = new Date();
const currentMoment = ref(new Date());
const yearRange = ref<number[]>([]);

function setupPicker() {
  if (props.disabled) return;

  status.value = !status.value;

  if (valueModel.value) {
    currentMoment.value = new Date(Number(valueModel.value), 0);
  } else {
    currentMoment.value = new Date();
  }

  const currentYear = d.getYear(currentMoment.value);
  yearRange.value = range(currentYear - 5, currentYear + 11);
}

function decrementYearsRange() {
  currentMoment.value = d.sub(currentMoment.value, { years: 16 });
  const currentYear = d.getYear(currentMoment.value);
  yearRange.value = range(currentYear - 5, currentYear + 11);
}

function incrementYearsRange() {
  currentMoment.value = d.add(currentMoment.value, { years: 16 });
  const currentYear = d.getYear(currentMoment.value);
  yearRange.value = range(currentYear - 5, currentYear + 11);
}

function selectYear(val: number) {
  if (isYearOutOfRange(val)) return;

  valueModel.value = val;
  status.value = false;
}

function isYearOutOfRange(cur: number) {
  const min = Number(props.min);
  const max = Number(props.max);

  if (props.min && props.max) {
    return min > cur || max < cur;
  } else if (props.min) {
    return min > cur;
  } else if (props.max) {
    return max < cur;
  }

  return false;
}

// -

const popover = inject('Popover', { withinPopover: false });
const target = ref<HTMLDivElement>();

if (popover.withinPopover) {
  onClickOutside(target, () => {
    status.value = false;
  });
}

// -

const input = ref<ComponentExposed<typeof TextField>>();

function keyboard(evt: KeyboardEvent) {
  if (['Space', 'Enter'].includes(evt.code)) {
    evt.preventDefault();
    setupPicker();
  }

  if (evt.code === 'Escape') {
    status.value = false;
  }

  if (evt.code === 'Tab') {
    input.value?.$el.querySelector('.TextField-Input').blur();
    status.value = false;
  }
}
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <Popover v-model="status" start class="w-full">
        <TextField
          :id
          ref="input"
          v-bind="$attrs"
          label=""
          :required="false"
          :invalid="!!invalid"
          help=""
          :value="valueModel ? String(valueModel) : ''"
          :disabled
          append="i-fa-calendar-o"
          readonly
          @clear="valueModel = null"
          @click="setupPicker"
          @append="setupPicker"
          @keydown="keyboard"
        />

        <template #content>
          <div ref="target" class="p-2">
            <div class="flex justify-between items-center mb-1">
              <div
                class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-1 rounded-full"
                @click="decrementYearsRange"
              >
                <div class="i-material-symbols-chevron-left-rounded size-4"></div>
              </div>

              <div>{{ yearRange[0] }} ~ {{ yearRange[15] }}</div>

              <div
                class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-1 rounded-full"
                @click="incrementYearsRange"
              >
                <div class="i-material-symbols-chevron-right-rounded size-4"></div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-1 text-center w-48">
              <div
                v-for="year in yearRange"
                :key="year"
                :value="year"
                class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm cursor-pointer"
                :class="{
                  'ring-1 ring-primary-500': year === d.getYear(now),
                  'text-white bg-primary-600 !hover:bg-primary-700':
                    valueModel &&
                    year === d.getYear(new Date(Number(valueModel), 0)) &&
                    d.getYear(currentMoment) === d.getYear(new Date(Number(valueModel), 0)),
                  'text-slate-300 dark:text-slate-600 !cursor-not-allowed': isYearOutOfRange(year),
                }"
                @click="selectYear(year)"
              >
                {{ year }}
              </div>
            </div>
          </div>
        </template>
      </Popover>
    </template>
  </FormControl>
</template>
