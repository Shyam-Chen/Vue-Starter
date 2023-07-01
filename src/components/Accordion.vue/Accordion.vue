<script lang="ts" setup>
import { reactive } from 'vue';

import Collapse from '../Collapse.vue';

defineProps<{
  title?: string;
  value?: string;
}>();

const flux = reactive({
  status: true,
  toggle() {
    flux.status = !flux.status;
  },
});
</script>

<template>
  <div class="w-full rounded shadow bg-white dark:bg-slate-800">
    <div
      class="flex px-4 py-3 cursor-pointer"
      :class="{ 'bg-slate-200 dark:bg-slate-700': flux.status }"
      @click="flux.toggle"
    >
      <div class="flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div v-if="!flux.status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-show="flux.status">
        <div class="p-4">
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>
