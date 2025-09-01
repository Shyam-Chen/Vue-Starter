<script lang="ts" setup>
import { XCheckbox } from '@x/ui';
import { ref } from 'vue';

const value = ref(false);
</script>

<template>
  <XCheckbox v-model:value="value" label="Example label" />

  <div class="flex gap-1 mt-1">
    Output:
    <pre>{{ value }}</pre>
  </div>
</template>
