<script lang="ts" setup>
import { ref } from 'vue';
import { XTreeSelect } from '@x/ui';

import options from './options';

const selected = ref<string[]>([]);
</script>

<template>
  <XTreeSelect v-model:value="selected" label="Example label" :options filterable />
</template>
