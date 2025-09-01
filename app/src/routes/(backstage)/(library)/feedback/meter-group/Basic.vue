<script lang="ts" setup>
import { XMeterGroup } from '@x/ui';
import { ref } from 'vue';

const value = ref([{ label: 'Space used', value: 15 }]);
</script>

<template>
  <XMeterGroup :value="value" />
</template>
