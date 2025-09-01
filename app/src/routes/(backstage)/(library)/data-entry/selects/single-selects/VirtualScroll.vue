<script lang="ts" setup>
import { XSelect } from '@x/ui';
import { ref } from 'vue';

const value = ref('');

const options = Array.from({ length: 3_000 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: index + 1,
}));
</script>

<template>
  <XSelect v-model:value="value" label="Example label" :options />
</template>
