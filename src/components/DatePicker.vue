<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import uniqueId from 'lodash/uniqueId';

import getScrollableParent from '~/utilities/getScrollableParent';

import TextField from './TextField.vue';
import DatePane from './_DatePane.vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: 'YYYY/MM/DD',
  },
  placeholder: {
    type: String,
    default: 'YYYY/MM/DD',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value', 'change']);

const uid = uniqueId('date-picker-');

const target = ref();
const input = ref();
const picker = ref();

const modelDate = computed({
  get: () => {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  },
});

const flux = reactive({
  showDatePicker: false,
  scrollableParent: null as HTMLElement | null,
  direction: '',
  openPicker() {
    flux.showDatePicker = true;

    nextTick(() => {
      flux.scrollableParent = getScrollableParent(picker.value.$el);

      const rect = input.value.$el.getBoundingClientRect();

      // picker.value.flux.currentMoment = props.value ? new Date(props.value) : new Date();
      // picker.value.flux.showYears = false;
      // picker.value.flux.showMonths = false;
      // picker.value.flux.showWeeks = true;

      // console.log(props.maxDate, props.minDate)

      // picker.value.currentPeriod = picker.value.getPeriodFromValue(
      //   picker.value.value,
      //   picker.value.format
      // )

      picker.value.$el.style.left = `${rect.left}px`;
      picker.value.$el.style.top = `${rect.bottom}px`;

      const center = window.innerHeight / 2;

      if (rect.top > center) {
        flux.direction = 'up';
      } else {
        flux.direction = 'down';
      }
    });
  },

  changeDate(val) {
    const parm1 = val ? new Date(val) : '';
    const parm2 = props.format;
    emit('change', parm1, parm2);
    flux.showDatePicker = false;
  },
  display(val) {
    const date = val ? new Date(val) : '';
    return date;
  },
  clear() {
    emit('update:value', '');
    emit('change', '', props.format);
    flux.showDatePicker = false;
  },
});

onClickOutside(target, (event) => {
  flux.showDatePicker = false;
});

const handleScroll = () => {
  if (flux.showDatePicker) {
    const rect = input.value.getBoundingClientRect();
    picker.value.$el.style.left = `${rect.left}px`;
    picker.value.$el.style.top = `${rect.bottom}px`;
  }
};

watch(
  () => flux.scrollableParent,
  (el) => {
    el?.addEventListener('scroll', handleScroll);
  },
);

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
  <div ref="target" class="w-full input-date">
    <div class="input-date-input-wrapper">
      <TextField
        ref="input"
        :value="modelDate"
        class="w-full form-control input-date-input"
        :class="{ danger: errorMessage }"
        :placeholder="placeholder"
        :disabled="disabled"
        append="i-fa-calendar-o"
        readonly
        @focus="flux.openPicker"
        @append="flux.openPicker"
      />

      <!-- <div
        v-if="modelDate && !disabled"
        class="input-date-icon input-date-icon-clear"
        @click.stop="flux.clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
          />
        </svg>
      </div>

      <div class="input-date-btn px-2" @click="flux.openPicker">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-calendar"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
          />
        </svg>
      </div> -->
    </div>

    <Transition>
      <DatePane
        v-show="flux.showDatePicker"
        ref="picker"
        v-model:value="modelDate"
        v-bind="$attrs"
        class="input-date-picker"
        :class="{ 'input-date-picker-up': flux.direction === 'up' }"
        :disabled="disabled"
        @update:value="flux.changeDate"
      />
    </Transition>

    <div v-if="errorMessage" class="text-danger mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-date {
  $self: &;
  $height: 40px;

  &-input-wrapper {
    display: flex;
    position: relative;

    &:hover #{$self}-icon-clear {
      visibility: visible;
    }
  }

  &-input {
    // text-align: inherit;
    // height: 30px;
    // border-radius: 2px;
    // border-top-right-radius: 0;
    // border-bottom-right-radius: 0;
    // background: #e4ebf0;
    // box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    // border: 0.0625rem solid #d1d9e6;
    // padding: 0 0.75rem;
    // outline: none;

    &:focus {
      border: 0.0625rem solid #007bff;
    }

    &:disabled {
      cursor: not-allowed;
      border-radius: 2px;
      color: #c4c4c4;
      background: #c4c4c4;
      box-shadow: inset 3px 3px 6px #a7a7a7, inset -3px -3px 6px #e1e1e1;
    }

    &.danger {
      border-color: var(--danger);
    }
  }

  &-icon {
    cursor: pointer;
    position: absolute;
    right: 3.25rem;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 14px;
    height: 40px;
  }

  &-icon-clear {
    color: #6c757d;
    background: transparent;
    z-index: 100;
    visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: #6c757d;
    }
  }

  &-btn {
    border-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.0625rem solid #d1d9e6;
    border-left: 0;
  }

  &-picker {
    position: fixed;
    z-index: 10;
  }

  &-picker-up {
    transform: translateY(-$height) translateY(-100%);
  }
}
</style>
