<script lang="ts" setup>
import { computed, reactive } from 'vue';

import Collapse from '../collapse/Collapse.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title?: string;
  }>(),
  {
    modelValue: undefined,
    title: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const flux = reactive({
  status: true,
  toggle() {
    if (typeof props.modelValue === 'boolean') {
      model.value = !model.value;
    } else {
      flux.status = !flux.status;
    }
  },
});

const _status = computed(() => (typeof props.modelValue === 'boolean' ? model.value : flux.status));
</script>

<template>
  <div class="w-full">
    <div
      class="flex items-center px-4 py-3 text-zinc-600 dark:text-zinc-400 cursor-pointer shadow bg-white dark:bg-slate-800 transition rounded-md"
      :class="{ 'accordion-active': _status }"
      @click="flux.toggle"
    >
      <div class="text-xl font-bold flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div v-if="!_status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-show="_status" class="rounded-b-md shadow bg-white dark:bg-slate-800">
        <div class="p-4">
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
