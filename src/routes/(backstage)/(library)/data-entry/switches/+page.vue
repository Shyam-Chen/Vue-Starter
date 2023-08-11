<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Switch from '~/components/Switch.vue';

const flux = reactive({
  switch1: false,
});
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Switches' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Switches</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Switch v-model:value="flux.switch1">Switch</Switch>
    </div>

    <pre class="text-center mt-2">{{ flux.switch1 }}</pre>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Checked and Readonly</div>

    <div class="flex justify-center space-x-4">
      <Switch checked readonly>Switch (checked)</Switch>
      <Switch :checked="false" readonly>Switch (unchecked)</Switch>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex space-x-4 justify-center">
      <Switch v-model:value="flux.switch1" disabled>Switch</Switch>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Without labels</div>

    <div class="flex justify-center">
      <Switch v-model:value="flux.switch1" />
    </div>
  </div>
</template>
