<script lang="ts" setup>
import { XCheckboxGroup, XDivider } from '@x/ui';
import { reactive } from 'vue';

const state = reactive({
  value: [] as string[],
  options: ['Angular', 'React', 'Svelte', 'Vue'],
});
</script>

<template>
  <XCheckboxGroup v-model:value="state.value" label="Example label" :options="state.options" />
  <XDivider />
  <div>Output: {{ state.value }}</div>
</template>
