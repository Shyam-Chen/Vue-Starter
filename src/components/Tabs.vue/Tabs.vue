<script lang="ts" setup>
import { useSlots, ref, reactive, computed, provide } from 'vue';

const props = defineProps<{
  modelValue?: number | string;
  closeable?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: number | string): void;
}>();

const slots = useSlots();
const defaultSlot = slots.default?.();

const tabs = ref();

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

provide('Tabs', {
  tabs,
  modelValue: computed(() => props.modelValue),
});
</script>

<template>
  <div class="w-full">
    <div class="flex items-center border-b border-slate-500">
      <div
        v-for="(tab, idx) in flux.tab"
        :key="idx"
        class="tab"
        :class="{
          active: flux.activeTab(tab, idx) === modelValue,
        }"
        @click="flux.selectTab(tab, idx)"
      >
        {{ tab?.title }}
        <div v-if="closeable" class="i-fa-close w-3 h-3 ml-3"></div>
      </div>
    </div>

    <div ref="tabs">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  @apply flex items-center cursor-pointer px-7 pt-4 pb-3.5 border-b-2 border-transparent;
  @apply text-xs font-medium uppercase leading-tight text-neutral-500;

  &.active {
    @apply text-primary-500 border-primary-500;
  }
}
</style>
