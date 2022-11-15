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
  direction: '' as 'down' | 'up' | '',
  openPicker() {
    flux.showDatePicker = true;

    nextTick(() => {
      flux.scrollableParent = getScrollableParent(picker.value.$el);

      const rect = input.value.$el.getBoundingClientRect();

      // picker.value.flux.currentMoment = props.value ? new Date(props.value) : new Date();
      // picker.value.flux.showYears = false;
      // picker.value.flux.showMonths = false;
      // picker.value.flux.showWeeks = true;

      picker.value.$el.style.left = `${rect.left}px`;
      picker.value.$el.style.top = `${rect.top}px`;

      const center = window.innerHeight / 2;

      if (rect.top > center) {
        flux.direction = 'up';
      } else {
        flux.direction = 'down';
      }
    });
  },

  changeDate(val: string) {
    const parm1 = val ? new Date(val) : '';
    const parm2 = props.format;
    emit('change', parm1, parm2);
    flux.showDatePicker = false;
  },
  display(val: string) {
    const date = val ? new Date(val) : '';
    return date;
  },
  clear() {
    emit('update:value', '');
    emit('change', '', props.format);
    flux.showDatePicker = false;
  },
});

onClickOutside(target, () => {
  flux.showDatePicker = false;
});

const handleScroll = () => {
  if (flux.showDatePicker) {
    const rect = input.value.$el.getBoundingClientRect();
    picker.value.$el.style.left = `${rect.left}px`;
    picker.value.$el.style.top = `${rect.top}px`;
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
  <div ref="target" class="w-full">
    <TextField
      :id="uid"
      ref="input"
      :value="modelDate"
      :placeholder="placeholder"
      :errorMessage="errorMessage"
      :disabled="disabled"
      append="i-fa-calendar-o"
      readonly
      @focus="flux.openPicker"
      @append="flux.openPicker"
    />

    <Transition name="fade">
      <DatePane
        v-show="flux.showDatePicker"
        ref="picker"
        v-model:value="modelDate"
        v-bind="$attrs"
        class="fixed z-10"
        :class="{
          'DatePicker-DatePane-PlacementBottom': flux.direction === 'down',
          'DatePicker-DatePane-PlacementTop': flux.direction === 'up',
        }"
        :disabled="disabled"
        @update:value="flux.changeDate"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.DatePicker-DatePane-PlacementBottom {
  transform: translateY(38px) translateY(0.5rem);
}

.DatePicker-DatePane-PlacementTop {
  transform: translateY(-100%) translateY(-0.5rem);
}
</style>
