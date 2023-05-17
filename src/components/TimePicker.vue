<script lang="ts" setup>
import { reactive } from 'vue';
import range from 'lodash/range';

import TextField from './TextField.vue';
import Select from './Select.vue';
import Button from './Button.vue';
import Fade from './Fade.vue';

const flux = reactive({
  hours: range(1, 13).map((n) => String(n).padStart(2, '0')),
  minutes: range(60).map((n) => String(n).padStart(2, '0')),
});
</script>

<template>
  <div ref="target" class="w-full">
    <TextField append="i-fa-clock-o" />

    <Fade>
      <div
        class="fixed z-10 flex flex-col p-6 space-y-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
      >
        <div class="flex items-center gap-2">
          <Select
            class="text-3xl"
            :value="'02'"
            :options="flux.hours.map((h) => ({ label: h, value: h }))"
            display="value"
          />

          <div class="text-3xl">:</div>

          <Select
            class="text-3xl"
            :value="'30'"
            :options="flux.minutes.map((m) => ({ label: m, value: m }))"
            display="value"
          />

          <Select
            class="text-3xl ml-2"
            :value="'PM'"
            :options="['AM', 'PM'].map((v) => ({ label: v, value: v }))"
            display="value"
          />
        </div>

        <div class="text-right">
          <Button>OK</Button>
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
