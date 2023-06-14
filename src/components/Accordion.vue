<script lang="ts" setup>
import { reactive } from 'vue';

import Collapse from './Collapse.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
});

const flux = reactive({
  status: true,
  toggle() {
    flux.status = !flux.status;
  },
});
</script>

<template>
  <div class="w-full rounded shadow bg-white dark:bg-slate-800">
    <div class="flex p-6 cursor-pointer" @click="flux.toggle">
      <div class="flex-1">
        <slot name="header"></slot>
      </div>

      <div v-if="!flux.status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-show="flux.status">
        <div class="px-6 pb-6">
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>
