<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue';
import { inject, onMounted, ref } from 'vue';

const self = ref<HTMLDivElement>();
const stepself = ref<number>();

const stepper = inject('Stepper') as { modelValue: ComputedRef<number>; body: Ref<HTMLDivElement> };

onMounted(() => {
  const idx = Array.from(stepper.body.value.children).indexOf(self.value as Element);
  stepself.value = idx + 1;
});
</script>

<template>
  <div v-show="stepper.modelValue.value === stepself" ref="self">
    <slot></slot>
  </div>
</template>
