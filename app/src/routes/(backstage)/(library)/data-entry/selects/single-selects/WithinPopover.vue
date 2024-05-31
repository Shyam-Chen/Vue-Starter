<script lang="ts" setup>
import { XButton, XCard, XPopover, XSelect } from '@x/ui';
import { reactive } from 'vue';

const flux = reactive({
  popoverStatus: false,
  select: '',
  select1Options: [
    { label: 'Angular', value: 'f1' },
    { label: 'React', value: 'f2' },
    { label: 'Svelte', value: 'f3' },
    { label: 'Vue', value: 'f4' },
    { label: 'Nest', value: 'b1' },
    { label: 'Express', value: 'b2' },
    { label: 'Fastify', value: 'b3' },
    { label: 'Koa', value: 'b4' },
  ],
});
</script>

<template>
  <XPopover v-model="flux.popoverStatus">
    <XButton label="Launch" @click="flux.popoverStatus = true" />

    <template #content>
      <XCard>
        <XSelect
          v-model:value="flux.select"
          :label="'Example label'"
          :options="flux.select1Options"
        />
      </XCard>
    </template>
  </XPopover>
</template>
