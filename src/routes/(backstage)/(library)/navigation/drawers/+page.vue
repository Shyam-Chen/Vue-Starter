<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XButton, XDrawer, XRadioGroup } from '@x/ui';

const flux = reactive({
  drawer1: false,

  drawer2: false,
  placement2: 'right' as InstanceType<typeof XDrawer>['placement'],
  placementOptions2: ['top', 'right', 'bottom', 'left'],

  drawer3: false,
  placement3: 'right' as InstanceType<typeof XDrawer>['placement'],
  placementOptions3: ['top', 'right', 'bottom', 'left'],

  drawer4: false,
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Drawers' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Drawers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div><XButton @click="flux.drawer1 = true">Open</XButton></div>

    <XDrawer v-model="flux.drawer1" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Placement</div>

    <XRadioGroup v-model:value="flux.placement2" :options="flux.placementOptions2" />
    <div><XButton @click="flux.drawer2 = true">Open</XButton></div>

    <XDrawer v-model="flux.drawer2" :placement="flux.placement2" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Size</div>

    <XRadioGroup v-model:value="flux.placement3" :options="flux.placementOptions3" />
    <div><XButton @click="flux.drawer3 = true">Open</XButton></div>

    <XDrawer
      v-model="flux.drawer3"
      :placement="flux.placement3"
      :class="{
        '!w-80': ['left', 'right'].includes(flux.placement3),
        '!h-80': ['top', 'bottom'].includes(flux.placement3),
      }"
    />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Full Screen</div>

    <div><XButton @click="flux.drawer4 = true">Open</XButton></div>

    <XDrawer v-model="flux.drawer4" placement="top" class="!w-screen !h-screen">
      <div class="flex justify-center">
        <XButton @click="flux.drawer4 = false">Close</XButton>
      </div>
    </XDrawer>
  </div>
</template>
