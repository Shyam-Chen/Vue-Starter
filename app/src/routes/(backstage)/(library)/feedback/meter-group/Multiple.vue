<script lang="ts" setup>
import { XMeterGroup } from '@x/ui';
import { ref } from 'vue';

const value = ref([
  { label: 'Apps', value: 16, color: 'bg-emerald-400' },
  { label: 'Messages', value: 8, color: 'bg-amber-400' },
  { label: 'Media', value: 24, color: 'bg-blue-400' },
  { label: 'System', value: 10, color: 'bg-purple-400' },
]);
</script>

<template>
  <XMeterGroup :value="value" />
</template>
