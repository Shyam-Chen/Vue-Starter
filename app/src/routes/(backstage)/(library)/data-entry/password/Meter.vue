<script lang="ts" setup>
import { ref } from 'vue';
import { XPassword } from '@x/ui';

const password = ref('');
</script>

<template>
  <XPassword v-model:value="password" label="Password" meter />
</template>
