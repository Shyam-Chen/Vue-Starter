<script lang="ts" setup>
import type { MaybeElement } from '@vueuse/core';

interface OutlineItem {
  text: string;
  sub?: boolean;

  el?: MaybeElement;
  status?: boolean;

  clickItem?: () => void;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    items?: OutlineItem[];
  }>(),
  {
    items: () => [],
  },
);

const emit = defineEmits<{
  (evt: 'clickItem', index: number): void;
}>();

function currentSectionStatus(index: number) {
  if (props.items[index].status) {
    const _sections = [...props.items];
    if (_sections.slice(0, index).some((item) => !!item.status)) return false;
    return true;
  }

  return false;
}
</script>

<template>
  <div v-bind="$attrs" class="sticky border-s border-gray-200 dark:border-gray-700">
    <div class="ps-2 border-s-2 border-transparent my-1 font-bold">On this page</div>

    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="OutlineItem"
        :class="{ active: currentSectionStatus(index), '!ps-6': item.sub }"
        @click="emit('clickItem', index)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.OutlineItem {
  @apply ps-2 border-s-2 border-transparent my-1 cursor-pointer;

  &:not(.active) {
    @apply hover:text-slate-600 dark:hover:text-slate-300;
  }

  &.active {
    @apply text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400;
  }
}
</style>
