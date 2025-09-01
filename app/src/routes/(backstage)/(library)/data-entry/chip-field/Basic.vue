<script lang="ts" setup>
import { XChipField } from '@x/ui';
import { ref } from 'vue';

const values = ref<string[]>([]);
</script>

<template>
  <XChipField v-model:value="values" label="Example label" placeholder="Type here..." />
</template>
