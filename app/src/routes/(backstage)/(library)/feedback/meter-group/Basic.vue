<script lang="ts" setup>
import { ref } from 'vue';
import { XMeterGroup } from '@x/ui';

const value = ref([{ label: 'Space used', value: 15 }]);
</script>

<template>
  <XMeterGroup :value="value" />
</template>
