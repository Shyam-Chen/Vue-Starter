<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue';
import { ref, inject, onMounted } from 'vue';

defineProps<{
  title?: string;
  value?: string;
  disabled?: boolean;
}>();

const tabs = inject('Tabs') as {
  modelValue: ComputedRef<string | number | undefined>;
  slotWrapper: Ref<HTMLDivElement | undefined>;
};

const self = ref<HTMLDivElement>();
const currentIndex = ref(-1);

onMounted(() => {
  if (tabs.slotWrapper.value?.children?.length) {
    currentIndex.value = Array.from(tabs.slotWrapper.value.children).indexOf(self.value as Element);
  }
});
</script>

<template>
  <div
    v-show="tabs.modelValue.value === currentIndex || tabs.modelValue.value === value"
    ref="self"
  >
    <slot></slot>
  </div>
</template>
