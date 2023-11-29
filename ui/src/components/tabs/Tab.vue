<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue';
import { ref, inject, onMounted } from 'vue';

defineProps<{
  title?: string;
  value?: string;
  disabled?: boolean;
}>();

const tabs = inject('Tabs') as {
  curIdx: Ref<number>;
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
    v-show="
      tabs.curIdx.value === currentIndex ||
      tabs.modelValue.value === currentIndex ||
      (value && tabs.modelValue.value === value)
    "
    ref="self"
  >
    <slot></slot>
  </div>
</template>
