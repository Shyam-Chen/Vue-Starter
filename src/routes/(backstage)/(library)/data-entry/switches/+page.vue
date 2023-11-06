<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XSwitch } from '@x/ui';

const flux = reactive({
  switch1: false,
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Switch' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Switch</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XSwitch v-model:value="flux.switch1">Switch</XSwitch>
    </div>

    <pre class="text-center mt-2">{{ flux.switch1 }}</pre>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Checked and Readonly</div>

    <div class="flex justify-center space-x-4">
      <XSwitch checked readonly>Switch (checked)</XSwitch>
      <XSwitch :checked="false" readonly>Switch (unchecked)</XSwitch>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex space-x-4 justify-center">
      <XSwitch v-model:value="flux.switch1" disabled>Switch</XSwitch>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Without labels</div>

    <div class="flex justify-center">
      <XSwitch v-model:value="flux.switch1" />
    </div>
  </div>
</template>
