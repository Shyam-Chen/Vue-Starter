<script lang="ts" setup>
import { nextTick, ref, watch, provide } from 'vue';
import { RouterLink } from 'vue-router';
import { useScroll } from '@vueuse/core';

import type { TabProps } from './Tab.vue';

const defaultModel = defineModel<number | string>();

defineProps<{
  closeable?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'change', val?: string | number): void;
  (evt: 'close', val?: string | number): void;
}>();

const currentTab = ref(0);
const tabs = ref<TabProps[]>([]);
const tabSlider = ref<HTMLDivElement>();

function isActive(tab: TabProps) {
  if (typeof defaultModel.value === 'number') return tab.index === defaultModel.value;
  if (typeof defaultModel.value === 'string') return tab.value === defaultModel.value;
  return tab.index === currentTab.value;
}

async function onClickTab(tab: TabProps) {
  if (tab.disabled) return;

  if (typeof defaultModel.value === 'number') {
    defaultModel.value = tab.index;
    emit('change', tab.index);
  } else if (typeof defaultModel.value === 'string') {
    defaultModel.value = tab.value;
    emit('change', tab.value);
  } else {
    currentTab.value = tab.index || 0;
    emit('change', tab.index);
  }

  await nextTick();
  const active = tabWrapper.value?.querySelector('.Tabs-Tab.active');
  active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  moveSlider();
}

async function moveSlider() {
  await nextTick();
  const active = tabWrapper.value?.querySelector('.Tabs-Tab.active');
  const activeRect = active?.getBoundingClientRect();

  if (tabSlider.value && activeRect && active) {
    tabSlider.value.style.width = activeRect.width + 'px';
    tabSlider.value.style.left = (active as HTMLDivElement).offsetLeft + 'px';
  }
}

function onClose(tab: TabProps) {
  if (typeof defaultModel.value === 'number') {
    emit('close', tab.index);
  } else if (typeof defaultModel.value === 'string') {
    emit('close', tab.value);
  } else {
    emit('close', tab.index);
  }
}

provide('Tabs', {
  currentTab,
  defaultModel,
  tabs,
  moveSlider,
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
      <template v-for="tab in tabs" :key="tab.index">
        <component
          :is="tab.to ? RouterLink : 'div'"
          class="Tabs-Tab"
          :class="{
            active: isActive(tab),
            disabled: tab.disabled,
          }"
          :to="tab.to"
          @click="onClickTab(tab)"
        >
          <template v-if="tab.titleSlot"><component :is="tab.titleSlot"></component></template>
          <template v-else>{{ tab.title }}</template>

          <div
            v-if="closeable"
            class="i-fa-close w-3 h-3 ml-3 transition hover:scale-125"
            @click.stop="onClose(tab)"
          ></div>
        </component>
      </template>

      <div
        ref="tabSlider"
        class="transition-all absolute bottom-0 h-0.5 bg-primary-500 rounded"
      ></div>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Tabs-TabWrapper {
  @apply relative;
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
    @apply text-primary-500;
  }

  &.disabled {
    @apply opacity-60 cursor-not-allowed;
  }
}
</style>
