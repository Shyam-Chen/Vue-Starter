<script lang="ts" setup>
import { ref } from 'vue';
import { XButton, XCard, XPopover, XTreeSelect } from '@x/ui';

import options from './options';

const selected = ref<string[]>([]);
</script>

<template>
  <XPopover>
    <XButton label="Launch" />

    <template #content>
      <XCard class="w-xs">
        <XTreeSelect v-model:value="selected" label="Example label" :options />
      </XCard>
    </template>
  </XPopover>
</template>
