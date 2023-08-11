<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Drawer from '~/components/Drawer.vue';
import Button from '~/components/Button.vue';
import RadioGroup from '~/components/RadioGroup.vue';

const flux = reactive({
  drawer1: false,

  drawer2: false,
  placement: 'right' as InstanceType<typeof Drawer>['placement'],
  placementOptions: ['top', 'right', 'bottom', 'left'],
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Drawers' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Drawers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div>
      <Button @click="flux.drawer1 = true">Open</Button>
    </div>

    <Drawer v-model="flux.drawer1" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Placement</div>

    <div class="flex">
      <RadioGroup v-model:value="flux.placement" :options="flux.placementOptions" />
      <Button class="ml-4" @click="flux.drawer2 = true">Open</Button>
    </div>

    <Drawer v-model="flux.drawer2" :placement="flux.placement" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Size</div>
  </div>
</template>
