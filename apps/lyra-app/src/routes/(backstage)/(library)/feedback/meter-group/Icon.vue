<script lang="ts" setup>
import { ref } from 'vue';
import { XMeterGroup } from '@lyra/ui';

const value = ref([
  { label: 'Apps', value: 16, color: 'bg-emerald-400', icon: 'i-tabler-apps' },
  { label: 'Messages', value: 8, color: 'bg-amber-400', icon: 'i-tabler-inbox' },
  { label: 'Media', value: 24, color: 'bg-blue-400', icon: 'i-tabler-photo' },
  { label: 'System', value: 10, color: 'bg-purple-400', icon: 'i-tabler-settings' },
]);
</script>

<template>
  <XMeterGroup :value="value" />
</template>
