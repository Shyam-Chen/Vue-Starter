<script lang="ts" setup>
import { h, useSlots, reactive, provide } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

provide('tabs', { value: props.modelValue });

const slots = useSlots();
const defaultSlot = slots.default();

const flux = reactive({
  tab: [] as any[],
});

for (let i = 0; i < defaultSlot.length; i++) {
  const tab = defaultSlot[i];
  flux.tab = [...flux.tab, tab.props];
}

const Render = () => {
  if (slots.default) {
    for (let i = 0; i < defaultSlot.length; i++) {
      const tab = defaultSlot[i];

      if (tab.props.value === props.modelValue) {
        return h('div', {}, slots.default ? slots.default()[i] : null);
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
        class="px-5 py-2 rounded-t bg-slate-200 text-slate-500 [&:not(:first-of-type)]:ml-2 cursor-pointer"
        :class="{ 'important:bg-white important:text-blue-600': tab.value === modelValue }"
        @click="emit('update:modelValue', tab.value)"
      >
        {{ tab.title }}
      </div>
    </div>

    <div class="p-4 bg-white rounded-b">
      <Render />
    </div>
  </div>
</template>
