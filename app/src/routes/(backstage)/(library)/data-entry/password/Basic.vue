<script lang="ts" setup>
import { XPassword } from '@x/ui';
import { ref } from 'vue';

const password = ref('');
</script>

<template>
  <XPassword v-model:value="password" label="Password" />

  <div class="flex gap-1 mt-1">
    Output:
    <pre>{{ password }}</pre>
  </div>
</template>
