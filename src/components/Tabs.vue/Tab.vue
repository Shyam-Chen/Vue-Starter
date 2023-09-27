<script lang="ts" setup>
import { ref, reactive, inject, onMounted } from 'vue';

defineProps<{
  title?: string;
  value?: string;
}>();

const tabs = inject('Tabs') as any;

const self = ref<HTMLDivElement>();

const flux = reactive({
  idx: null as number | null,
});

onMounted(() => {
  const idx = Array.from(tabs.tabs.value.children).indexOf(self.value as Element);
  flux.idx = idx;
});
</script>

<template>
  <div v-show="tabs.modelValue.value === flux.idx || tabs.modelValue.value === value" ref="self">
    <slot></slot>
  </div>
</template>
