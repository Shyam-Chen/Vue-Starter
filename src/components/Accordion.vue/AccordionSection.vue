<script lang="ts" setup>
import type { Ref, ComputedRef, WritableComputedRef } from 'vue';
import { reactive, inject, getCurrentInstance, onMounted } from 'vue';

import Collapse from '../Collapse.vue';

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

const accordionGroup = inject('AccordionGroup') as {
  group: Ref<HTMLDivElement>;
  curIdx: Ref<number>;
  value: ComputedRef<string[] | undefined>;
  modelValue: WritableComputedRef<string[]>;
  multiple: ComputedRef<boolean>;
};

const instance = getCurrentInstance();

const flux = reactive({
  idx: null as number | null,
  toggle() {
    if (!accordionGroup.value.value) {
      const curIdx = accordionGroup.curIdx.value;
      const curTabIdx = Array.from(accordionGroup.group.value.children).indexOf(
        instance?.vnode.el as Element,
      );
      if (curIdx !== curTabIdx) accordionGroup.curIdx.value = curTabIdx;
      if (curIdx === curTabIdx) accordionGroup.curIdx.value = -1;
    }

    if (accordionGroup.value.value) {
      if (accordionGroup.multiple.value) {
        if (accordionGroup.modelValue.value?.includes(props.value)) {
          accordionGroup.modelValue.value = [...accordionGroup.modelValue.value].filter(
            (item) => item !== props.value,
          );
        } else {
          accordionGroup.modelValue.value = [...accordionGroup.modelValue.value, props.value];
        }
      } else {
        if (accordionGroup.modelValue.value?.includes(props.value)) {
          accordionGroup.modelValue.value = [...accordionGroup.modelValue.value].filter(
            (item) => item !== props.value,
          );
        } else {
          accordionGroup.modelValue.value = [props.value];
        }
      }
    }
  },
});

onMounted(() => {
  const idx = Array.from(accordionGroup.group.value.children).indexOf(
    instance?.vnode.el as Element,
  );
  flux.idx = idx;
});
</script>

<template>
  <div class="w-full rounded shadow bg-white dark:bg-slate-800">
    <div
      class="flex px-4 py-3 cursor-pointer"
      :class="{
        'bg-slate-200 dark:bg-slate-700':
          accordionGroup.curIdx.value === flux.idx ||
          accordionGroup.modelValue.value?.includes(value),
      }"
      @click="flux.toggle"
    >
      <div class="flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div
        v-if="
          !(
            accordionGroup.curIdx.value === flux.idx ||
            accordionGroup.modelValue.value?.includes(value)
          )
        "
        class="i-ic-baseline-arrow-drop-down w-6 h-6"
      ></div>
      <div v-else class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
    </div>

    <Collapse>
      <div
        v-show="
          accordionGroup.curIdx.value === flux.idx ||
          accordionGroup.modelValue.value?.includes(value)
        "
      >
        <div class="p-4">
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>
