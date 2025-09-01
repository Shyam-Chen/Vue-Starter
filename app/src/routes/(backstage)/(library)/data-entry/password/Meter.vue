<script lang="ts" setup>
import { XPassword } from '@x/ui';
import { ref } from 'vue';

const password = ref('');
</script>

<template>
  <XPassword v-model:value="password" label="Password" meter />
</template>
