<script lang="ts" setup>
import type { VNode } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';
import { nextTick, ref, computed, watch, provide, useSlots } from 'vue';
import { RouterLink } from 'vue-router';
import { useScroll } from '@vueuse/core';

import Tab from './Tab.vue';

type TabProps = ComponentProps<typeof Tab>;

const props = defineProps<{
  modelValue?: number | string;
  closeable?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val?: number | string): void;
  (evt: 'change', val: string | number): void;
  (evt: 'close', val: string | number): void;
}>();

const slots = useSlots();
const tabs = ref<VNode[]>([]);

const curIdx = ref(0);

watch(
  () => slots.default?.(),
  () => {
    const defaultSlot = slots.default?.();

    if (defaultSlot) {
      tabs.value = [];

      for (let i = 0; i < defaultSlot.length; i++) {
        const tab = defaultSlot[i];

        if (tab.children?.length) {
          if (tab.children === 'v-if') continue;

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
  return curIdx.value === idx;
}

function onClickTab(tab: VNode['props'], idx: number) {
  if (tab?.disabled) return;

  curIdx.value = idx;

  if (typeof props.modelValue === 'number') {
    emit('update:modelValue', idx);
    emit('change', idx);
  }

  if (typeof props.modelValue === 'string') {
    emit('update:modelValue', tab?.value);
    emit('change', tab?.value);
  }

  nextTick(() => {
    const active = tabWrapper.value?.querySelector('.Tabs-Tab.active');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
}

function onClose(tab: VNode['props'], idx: number) {
  if (typeof props.modelValue === 'number') {
    emit('close', idx);
  }

  if (typeof props.modelValue === 'string') {
    emit('close', idx);
  }
}

const slotWrapper = ref<HTMLDivElement>();

provide('Tabs', {
  curIdx,
  modelValue: computed(() => props.modelValue),
  slotWrapper,
});

const hasScrollbar = ref(false);
const tabWrapper = ref<HTMLDivElement>();
const { arrivedState } = useScroll(tabWrapper);

watch(
  () => tabWrapper.value,
  (el) => {
    if (el) {
      hasScrollbar.value = el.scrollWidth > el.clientWidth;
    }
  },
);
</script>

<template>
  <div class="w-full">
    <div
      ref="tabWrapper"
      class="Tabs-TabWrapper"
      :class="{
        start: hasScrollbar && arrivedState.left,
        range: hasScrollbar && !arrivedState.left && !arrivedState.right,
        end: hasScrollbar && arrivedState.right,
      }"
    >
      <template v-for="(tab, idx) in tabs" :key="idx">
        <component
          :is="tab?.props?.to ? RouterLink : 'div'"
          class="Tabs-Tab"
          :class="{
            active: isActive(tab?.props, idx),
            disabled: tab?.props?.disabled,
          }"
          :to="tab?.props?.to"
          @click="onClickTab(tab?.props, idx)"
        >
          <template v-if="(tab?.children as TabProps)?.title">
            <component :is="(tab?.children as TabProps)?.title"></component>
          </template>

          <template v-else>{{ tab?.props?.title }}</template>

          <div
            v-if="closeable"
            class="i-fa-close w-3 h-3 ml-3 transition hover:scale-125"
            @click.stop="onClose(tab?.props, idx)"
          ></div>
        </component>
      </template>
    </div>

    <div ref="slotWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Tabs-TabWrapper {
  @apply flex flex-row items-center border-b border-gray-500;
  @apply overflow-x-auto;

  --scroll-shadow-size: 5rem;

  &.start {
    mask-image: linear-gradient(90deg, black calc(100% - var(--scroll-shadow-size)), transparent);
  }

  &.range {
    mask-image: linear-gradient(
      to right,
      transparent,
      black var(--scroll-shadow-size),
      black calc(100% - var(--scroll-shadow-size)),
      transparent
    );
  }

  &.end {
    mask-image: linear-gradient(270deg, black calc(100% - var(--scroll-shadow-size)), transparent);
  }

  &::-webkit-scrollbar {
    @apply w-0 h-0 bg-transparent;
  }
}

.Tabs-Tab {
  @apply flex items-center cursor-pointer px-7 pt-4 pb-3.5 border-b-2 border-transparent;
  @apply font-medium uppercase leading-tight text-neutral-500 whitespace-nowrap;

  &.active {
    @apply text-primary-500 border-primary-500;
  }

  &.disabled {
    @apply opacity-60 cursor-not-allowed;
  }
}
</style>
