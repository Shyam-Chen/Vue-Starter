<script lang="ts" setup>
import { XYearPicker } from '@x/ui';
import { ref } from 'vue';

const year = ref<number>();
</script>

<template>
  <XYearPicker v-model:value="year" />

  <div class="flex gap-1 mt-1">
    Output:
    <pre>{{ year }}</pre>
  </div>
</template>
