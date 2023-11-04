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
  <div class="w-full rounded">
    <div
      class="flex px-4 py-3 cursor-pointer shadow bg-white dark:bg-slate-800"
      :class="{ 'accordion-active': flux.status }"
      @click="flux.toggle"
    >
      <div class="flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div v-if="!flux.status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-show="flux.status" class="shadow bg-white dark:bg-slate-800">
        <div class="p-4">
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<style lang="scss" scoped>
.accordion-active {
  @apply bg-slate-200 dark:bg-slate-700;
}
</style>
