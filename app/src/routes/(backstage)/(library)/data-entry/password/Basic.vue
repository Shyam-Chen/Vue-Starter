<script lang="ts" setup>
import { ref } from 'vue';
import { XPassword } from '@x/ui';

const password = ref('');
</script>

<template>
  <XPassword v-model:value="password" label="Password" />

  <div class="flex gap-1 mt-1">
    Output:
    <pre>{{ password }}</pre>
  </div>
</template>
