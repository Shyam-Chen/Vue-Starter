<script lang="ts" setup>
import { ref } from 'vue';
import { XChipField } from '@x/ui';

const values = ref<string[]>([]);
</script>

<template>
  <XChipField v-model:value="values" label="Example label" placeholder="Type here..." />
</template>
