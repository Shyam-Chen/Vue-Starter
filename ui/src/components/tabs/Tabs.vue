<script lang="ts" setup>
import type { VNode } from 'vue';
import { ref, computed, watch, provide, useSlots } from 'vue';

const props = defineProps<{
  modelValue?: number | string;
  closeable?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val?: number | string): void;
  (evt: 'change', val: string | number): void;
}>();

const slots = useSlots();
const tabs = ref<VNode[]>([]);

watch(
  () => slots.default?.(),
  () => {
    const defaultSlot = slots.default?.();

    if (defaultSlot) {
      tabs.value = [];

      for (let i = 0; i < defaultSlot.length; i++) {
        const tab = defaultSlot[i];

        if (tab.children?.length) {
          const tabChildren = tab.children as VNode[];

          for (let j = 0; j < tabChildren.length; j++) {
            const child = tabChildren[j];
            tabs.value = [...tabs.value, child];
          }
        } else {
          tabs.value = [...tabs.value, tab];
        }
      }
    }
  },
  { deep: true, immediate: true },
);

function isActive(tab: VNode['props'], idx: number) {
  if (typeof props.modelValue === 'number') return idx === props.modelValue;
  if (typeof props.modelValue === 'string') return tab?.value === props.modelValue;
}

function onClickTab(tab: VNode['props'], idx: number) {
  if (tab?.disabled) return;

  if (typeof props.modelValue === 'number') {
    emit('update:modelValue', idx);
    emit('change', idx);
  }

  if (typeof props.modelValue === 'string') {
    emit('update:modelValue', tab?.value);
    emit('change', tab?.value);
  }
}

const slotWrapper = ref<HTMLDivElement>();

provide('Tabs', {
  modelValue: computed(() => props.modelValue),
  slotWrapper,
});
</script>

<template>
  <div class="w-full">
    <div class="Tabs-TabWrapper">
      <div
        v-for="(tab, idx) in tabs"
        :key="idx"
        class="Tabs-Tab"
        :class="{
          active: isActive(tab?.props, idx),
          disabled: tab?.props?.disabled,
        }"
        @click="onClickTab(tab?.props, idx)"
      >
        <template v-if="(tab?.children as any)?.title">
          <component :is="(tab?.children as any)?.title"></component>
        </template>

        <template v-else>{{ tab?.props?.title }}</template>

        <div v-if="closeable" class="i-fa-close w-3 h-3 ml-3"></div>
      </div>
    </div>

    <div ref="slotWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Tabs-TabWrapper {
  @apply flex flex-row items-center border-b border-#ADAFB3;
  @apply overflow-x-auto;

  &::-webkit-scrollbar {
    @apply w-0 h-0 bg-transparent;
  }
}

.Tabs-Tab {
  @apply flex items-center cursor-pointer px-7 pt-4 pb-3.5 border-b-2 border-transparent;
  @apply text-xs font-medium uppercase leading-tight text-neutral-500 whitespace-nowrap;

  &.active {
    @apply text-primary-500 border-primary-500;
  }

  &.disabled {
    @apply opacity-60 cursor-not-allowed;
  }
}
</style>
