<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XButton, XCard, XDrawer, XRadioGroup } from '@x/ui';

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
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Drawer' }]" />

  <h1 class="text-4xl font-extrabold my-4">Drawer</h1>
  <p>Drawer is a container component displayed as an overlay.</p>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div><XButton @click="flux.drawer1 = true">Open</XButton></div>

      <XDrawer v-model="flux.drawer1" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Placement</h2>

    <XCard>
      <div class="flex flex-col gap-4">
        <XRadioGroup v-model:value="flux.placement2" :options="flux.placementOptions2" />
        <div><XButton @click="flux.drawer2 = true">Open</XButton></div>
      </div>

      <XDrawer v-model="flux.drawer2" :placement="flux.placement2" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Size</h2>

    <XCard>
      <div class="flex flex-col gap-4">
        <XRadioGroup v-model:value="flux.placement3" :options="flux.placementOptions3" />
        <div><XButton @click="flux.drawer3 = true">Open</XButton></div>
      </div>

      <XDrawer
        v-model="flux.drawer3"
        :placement="flux.placement3"
        :class="{
          '!w-80': ['left', 'right'].includes(flux.placement3),
          '!h-80': ['top', 'bottom'].includes(flux.placement3),
        }"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Full Screen</h2>

    <XCard>
      <div><XButton @click="flux.drawer4 = true">Open</XButton></div>

      <XDrawer v-model="flux.drawer4" placement="bottom" class="!w-screen !h-screen">
        <div class="flex justify-center">
          <XButton @click="flux.drawer4 = false">Close</XButton>
        </div>
      </XDrawer>
    </XCard>
  </section>
</template>
