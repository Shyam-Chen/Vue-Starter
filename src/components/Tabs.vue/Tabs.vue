<script lang="ts" setup>
import { useSlots, reactive, provide } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

provide('tabs', { value: props.modelValue });

const slots = useSlots();
const defaultSlot = slots.default?.();

const flux = reactive({
  tab: [] as any[],
  activeTab(tab: any, idx: number) {
    if (typeof props.modelValue === 'number') return idx;
    if (typeof props.modelValue === 'string') return tab.value;
  },
  selectTab(tab: any, idx: number) {
    if (typeof props.modelValue === 'number') emit('update:modelValue', idx);
    if (typeof props.modelValue === 'string') emit('update:modelValue', tab.value);
  },
});

if (defaultSlot) {
  for (let i = 0; i < defaultSlot.length; i++) {
    const tab = defaultSlot[i];
    flux.tab = [...flux.tab, tab.props];
  }
}

const Render = () => {
  if (slots.default) {
    if (typeof props.modelValue === 'number') {
      return slots.default()[props.modelValue];
    }

    if (typeof props.modelValue === 'string' && defaultSlot) {
      for (let i = 0; i < defaultSlot.length; i++) {
        const tab = defaultSlot[i];

        if (tab.props?.value === props.modelValue) {
          return slots.default()[i];
        }
      }
    }
  }
};
</script>

<template>
  <div class="w-full">
    <div class="flex items-center bg-gray-100 text-gray-800">
      <div
        v-for="(tab, idx) in flux.tab"
        :key="idx"
        class="flex items-center px-5 py-2 rounded-t bg-slate-200 text-slate-500 [&:not(:first-of-type)]:ml-2 cursor-pointer"
        :class="{
          'important:bg-white important:text-blue-600': flux.activeTab(tab, idx) === modelValue,
        }"
        @click="flux.selectTab(tab, idx)"
      >
        {{ tab.title }}
        <!-- <div class="i-fa-close w-3 h-3 ml-2"></div> -->
      </div>
    </div>

    <div class="p-4 bg-white rounded-b">
      <Render />
    </div>
  </div>
</template>
