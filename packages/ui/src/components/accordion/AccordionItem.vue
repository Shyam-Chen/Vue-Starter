<script lang="ts" setup>
import type { Ref, ComputedRef, WritableComputedRef } from 'vue';
import { ref, reactive, inject, onMounted } from 'vue';

import Collapse from '../collapse/Collapse.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    value?: string;
  }>(),
  {
    title: '',
    value: '',
  },
);

const accordion = inject('Accordion') as {
  group: Ref<HTMLDivElement>;
  curIdx: Ref<number>;
  value: ComputedRef<string[] | undefined>;
  modelValue: WritableComputedRef<string[]>;
  multiple: ComputedRef<boolean>;
};

const self = ref<HTMLDivElement>();

const flux = reactive({
  idx: null as number | null,
  toggle() {
    if (!accordion.value.value) {
      const curIdx = accordion.curIdx.value;
      const curTabIdx = Array.from(accordion.group.value.children).indexOf(self.value as Element);
      if (curIdx !== curTabIdx) accordion.curIdx.value = curTabIdx;
      if (curIdx === curTabIdx) accordion.curIdx.value = -1;
    }

    if (accordion.value.value) {
      if (accordion.multiple.value) {
        if (accordion.modelValue.value?.includes(props.value)) {
          accordion.modelValue.value = [...accordion.modelValue.value].filter(
            (item) => item !== props.value,
          );
        } else {
          accordion.modelValue.value = [...accordion.modelValue.value, props.value];
        }
      } else {
        if (accordion.modelValue.value?.includes(props.value)) {
          accordion.modelValue.value = [...accordion.modelValue.value].filter(
            (item) => item !== props.value,
          );
        } else {
          accordion.modelValue.value = [props.value];
        }
      }
    }
  },
});

onMounted(() => {
  const idx = Array.from(accordion.group.value.children).indexOf(self.value as Element);
  flux.idx = idx;
});
</script>

<template>
  <div ref="self" class="w-full rounded shadow bg-white dark:bg-slate-800">
    <div
      class="flex px-4 py-3 cursor-pointer"
      :class="{
        'bg-slate-200 dark:bg-slate-700':
          accordion.curIdx.value === flux.idx || accordion.modelValue.value?.includes(value),
      }"
      @click="flux.toggle"
    >
      <div class="flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div
        v-if="!(accordion.curIdx.value === flux.idx || accordion.modelValue.value?.includes(value))"
        class="i-ic-baseline-arrow-drop-down w-6 h-6"
      ></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div
        v-show="accordion.curIdx.value === flux.idx || accordion.modelValue.value?.includes(value)"
      >
        <div class="p-4">
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>
