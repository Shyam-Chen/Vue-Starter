<script lang="ts" setup>
import { ref } from 'vue';
import { XCheckbox } from '@x/ui';

const value = ref(false);
</script>

<template>
  <XCheckbox v-model:value="value" label="Example label" />

  <div class="flex gap-1 mt-1">
    Output:
    <pre>{{ value }}</pre>
  </div>
</template>
