<script lang="ts" setup>
import { XTreeSelect } from '@x/ui';
import { ref } from 'vue';

import options from './options';

const selected = ref<string[]>([]);
</script>

<template>
  <XTreeSelect v-model:value="selected" label="Example label" :options filterable />
</template>
