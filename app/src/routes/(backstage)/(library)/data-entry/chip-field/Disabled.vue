<script lang="ts" setup>
import { XCheckbox, XChipField, XDivider } from '@x/ui';
import { ref } from 'vue';

const values = ref<string[]>([]);
const disabled = ref(true);
</script>

<template>
  <XChipField v-model:value="values" label="Example label" placeholder="Type here..." :disabled />
  <XDivider />
  <XCheckbox v-model:value="disabled">disabled</XCheckbox>
</template>
