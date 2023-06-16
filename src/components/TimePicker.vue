<script lang="ts" setup>
import { computed, reactive } from 'vue';
import range from 'lodash/range';

import TextField from './TextField.vue';
import Select from './Select.vue';
import Button from './Button.vue';
import Fade from './Fade.vue';

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
  meridiem: 'AM',

  openPicker() {
    flux.show = true;
  },
  selectTime() {
    flux.show = false;

    const hour = flux.meridiem === 'PM' ? String(Number(flux.hour) + 12) : flux.hour;
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
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      :value="flux.formatTimeValue(timeValue)"
      append="i-fa-clock-o"
      readonly
      @focus="flux.openPicker"
      @append="flux.openPicker"
    />

    <Fade>
      <div
        v-if="flux.show"
        class="fixed z-10 flex flex-col p-6 space-y-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
      >
        <div class="flex items-center gap-2">
          <Select
            v-model:value="flux.hour"
            class="text-3xl"
            :options="flux.hours.map((h) => ({ label: h, value: h }))"
            display="value"
          />

          <div class="text-3xl">:</div>

          <Select
            v-model:value="flux.minute"
            class="text-3xl"
            :options="flux.minutes.map((m) => ({ label: m, value: m }))"
            display="value"
          />

          <Select
            v-model:value="flux.meridiem"
            class="text-3xl ml-2"
            :options="['AM', 'PM'].map((v) => ({ label: v, value: v }))"
            display="value"
          />
        </div>

        <div class="text-right">
          <Button @click="flux.selectTime">OK</Button>
        </div>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
:deep(.select-input) {
  padding-right: 0.75rem;
  text-align: center;
}

:deep(.select-input-icon) {
  display: none;
}

:deep(.select-menu) {
  text-align: center;
}
</style>
