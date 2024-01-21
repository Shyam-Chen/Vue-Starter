<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue';
import { ref, computed, inject, onMounted } from 'vue';

const props = defineProps<{
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

const curTab = computed(() => {
  if (typeof tabs.modelValue.value === 'number') {
    return currentIndex.value === tabs.modelValue.value;
  }

  if (typeof tabs.modelValue.value === 'string') {
    return props.value === tabs.modelValue.value;
  }

  return tabs.curIdx.value === currentIndex.value;
});
</script>

<template>
  <div v-show="curTab" ref="self">
    <slot></slot>
  </div>
</template>
