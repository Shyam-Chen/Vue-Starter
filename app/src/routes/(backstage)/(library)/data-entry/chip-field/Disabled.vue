<script lang="ts" setup>
import { ref } from 'vue';
import { XChipField, XDivider, XCheckbox } from '@x/ui';

const values = ref<string[]>([]);
const disabled = ref(true);
</script>

<template>
  <XChipField v-model:value="values" label="Example label" placeholder="Type here..." :disabled />
  <XDivider />
  <XCheckbox v-model:value="disabled">disabled</XCheckbox>
</template>
