<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from 'vue';
import range from 'lodash/range';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';

import TextField from '../text-field/TextField.vue';
import InputMask from '../input-mask/InputMask.vue';
import Button from '../button';
import Fade from '../fade/Fade.vue';

const props = defineProps<{
  value?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val?: string): void;
}>();

const timeValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});

const flux = reactive({
  show: false,

  hour: '01',
  hours: range(1, 13).map((n) => String(n).padStart(2, '0')),
  minute: '00',
  minutes: range(60).map((n) => String(n).padStart(2, '0')),
  meridiem: 0 as 0 | 1,

  openPicker() {
    flux.show = true;

    nextTick(() => {
      resizePanel();
    });
  },
  selectTime() {
    flux.show = false;

    const hour = flux.meridiem === 1 ? String(Number(flux.hour) + 12) : flux.hour;
    timeValue.value = `${hour}:${flux.minute}`;
  },
  formatTimeValue(val: typeof timeValue.value) {
    if (val) {
      const [hour, minute] = val.split(':');

      if (Number(hour) > 12) {
        return `${Number(hour) - 12}:${minute} PM`;
      }

      return `${val} AM`;
    }

    return '';
  },
});

const input = ref();
const picker = ref();

const direction = ref<'down' | 'up'>('down');

function resizePanel() {
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

useScrollParent(
  computed(() => picker.value),
  () => {
    if (flux.show) resizePanel();
  },
);
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      ref="input"
      v-bind="$attrs"
      :value="flux.formatTimeValue(timeValue)"
      append="i-fa-clock-o"
      readonly
      @focus="flux.openPicker"
      @append="flux.openPicker"
    >
      <slot></slot>
    </TextField>

    <Fade>
      <div
        v-if="flux.show"
        ref="picker"
        class="fixed z-10 flex flex-col p-6 space-y-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
        :class="{
          'TimePicker-PlacementBottom': direction === 'down',
          'TimePicker-PlacementTop': direction === 'up',
        }"
      >
        <div class="flex items-center gap-2 w-auto">
          <div class="w-20 h-auto">
            <InputMask
              v-model:masked="flux.hour"
              :mask="{ mask: Number, min: 1, max: 12 }"
              class="text-3xl text-center"
            />
          </div>

          <div class="text-3xl">:</div>

          <div class="w-20 h-auto">
            <InputMask
              v-model:masked="flux.minute"
              :mask="{ mask: Number, min: 0, max: 59 }"
              class="text-3xl text-center"
            />
          </div>

          <div class="w-20 h-auto">
            <Button.Group v-model="flux.meridiem" class="flex-col">
              <Button label="AM" />
              <Button label="PM" />
            </Button.Group>
          </div>
        </div>

        <div class="flex justify-end">
          <Button @click="flux.selectTime">OK</Button>
        </div>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.TimePicker-PlacementBottom {
  transform: translateY(0.5rem);
}

.TimePicker-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}
</style>
