<script lang="ts" setup>
import { useEventSource } from '@vueuse/core';

const { status, data, error, close } = useEventSource('/api/sse');
</script>

<template>
  <div>{{ data }}</div>
</template>
