<script lang="ts" setup>
import { ref } from 'vue';
import { XYearPicker } from '@x/ui';

const year = ref<number>();
</script>

<template>
  <XYearPicker v-model:value="year" />

  <div class="flex gap-1 mt-1">
    Output:
    <pre>{{ year }}</pre>
  </div>
</template>
