<script lang="ts" setup>
import { computed, reactive } from 'vue';

import Collapse from '../collapse/Collapse.vue';

const props = withDefaults(
  defineProps<{
    status?: boolean;
    modelValue?: boolean;
    title?: string;
  }>(),
  {
    status: true,
    modelValue: undefined,
    title: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const defaultModel = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const flux = reactive({
  status: props.status,
  toggle() {
    if (typeof props.modelValue === 'boolean') {
      defaultModel.value = !defaultModel.value;
    } else {
      flux.status = !flux.status;
    }
  },
});

const _status = computed(() =>
  typeof props.modelValue === 'boolean' ? defaultModel.value : flux.status,
);
</script>

<template>
  <div class="w-full">
    <div
      class="flex items-center px-4 lg:px-6 py-3 lg:py-4 text-zinc-600 dark:text-zinc-400 cursor-pointer shadow bg-white dark:bg-slate-800 transition rounded-md"
      :class="{ 'accordion-active': _status }"
      @click="flux.toggle"
    >
      <div class="text-xl font-medium flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div v-if="!_status" class="i-material-symbols-add-rounded w-6 h-6"></div>
      <div v-else class="i-material-symbols-check-indeterminate-small-rounded w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-if="_status" class="rounded-b-md shadow bg-white dark:bg-slate-800">
        <div class="p-4 lg:p-6">
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<style lang="scss" scoped>
.accordion-active {
  @apply bg-gray-200 dark:bg-gray-700 rounded-t-md rounded-b-0;
}
</style>
