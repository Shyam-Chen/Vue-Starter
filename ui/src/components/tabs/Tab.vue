<script lang="ts" setup>
import type { ModelRef, Ref, VNode } from 'vue';
import { computed, inject, onBeforeMount, ref, watch } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';
import { RouterLink } from 'vue-router';

export interface TabProps {
  titleSlot?: any;
  index?: number;
  title?: string;
  value?: string;
  to?: ComponentProps<typeof RouterLink>['to'];
  disabled?: boolean;
}

const props = defineProps<TabProps>();

const slots = defineSlots<{
  default(props: NonNullable<unknown>): VNode;
  title(props: NonNullable<unknown>): VNode;
}>();

const tabs = inject('Tabs') as {
  currentTab: Ref<number>;
  defaultModel: ModelRef<string | number | undefined, string>;
  tabs: Ref<TabProps[]>;
  moveSlider: () => Promise<void>;
};

const tabIndex = ref<number>();

watch(
  () => Object.assign({}, props),
  () => {
    if (typeof tabIndex.value === 'number') {
      tabs.tabs.value[tabIndex.value] = {
        ...props,
        titleSlot: slots.title,
        index: tabIndex.value,
      };

      tabs.moveSlider();
    }
  },
);

onBeforeMount(() => {
  tabIndex.value = tabs.tabs.value.length;

  tabs.tabs.value.push({
    ...props,
    titleSlot: slots.title,
    index: tabs.tabs.value.length,
  });

  tabs.moveSlider();
});

const curTab = computed(() => {
  if (typeof tabs.defaultModel.value === 'number') {
    return tabIndex.value === tabs.defaultModel.value;
  }

  if (typeof tabs.defaultModel.value === 'string') {
    return props.value === tabs.defaultModel.value;
  }

  return tabIndex.value === tabs.currentTab.value;
});
</script>

<template>
  <div v-show="curTab">
    <slot></slot>
  </div>
</template>
