<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XButton, XDrawer, XRadioGroup } from '@x/ui';

const flux = reactive({
  drawer1: false,

  drawer2: false,
  placement: 'right' as InstanceType<typeof XDrawer>['placement'],
  placementOptions: ['top', 'right', 'bottom', 'left'],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Drawers' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Drawers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div>
      <XButton @click="flux.drawer1 = true">Open</XButton>
    </div>

    <XDrawer v-model="flux.drawer1" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Placement</div>

    <div class="flex">
      <XRadioGroup v-model:value="flux.placement" :options="flux.placementOptions" />
      <XButton class="ml-4" @click="flux.drawer2 = true">Open</XButton>
    </div>

    <XDrawer v-model="flux.drawer2" :placement="flux.placement" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Size</div>
  </div>
</template>
