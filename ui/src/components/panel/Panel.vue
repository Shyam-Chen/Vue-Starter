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

const panelModel = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const flux = reactive({
  status: true,
  toggle() {
    if (typeof props.modelValue === 'boolean') {
      panelModel.value = !panelModel.value;
    } else {
      flux.status = !flux.status;
    }
  },
});

const _status = computed(() =>
  typeof props.modelValue === 'boolean' ? panelModel.value : flux.status,
);
</script>

<template>
  <div class="w-full rounded">
    <div
      class="flex px-4 py-3 cursor-pointer shadow bg-white dark:bg-slate-800"
      :class="{ 'accordion-active': _status }"
      @click="flux.toggle"
    >
      <div class="flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div v-if="!_status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-show="_status" class="shadow bg-white dark:bg-slate-800">
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
