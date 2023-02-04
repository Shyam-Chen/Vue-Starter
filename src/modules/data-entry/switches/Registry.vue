<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import ToggleSwitch from '~/components/ToggleSwitch.vue';

const flux = reactive({
  toggleSwitch: false,
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Switches', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Switches</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch">Switch</ToggleSwitch>
    </div>

    <pre class="text-center mt-2">{{ flux.toggleSwitch }}</pre>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Checked and Readonly</div>

    <div class="flex justify-center space-x-4">
      <ToggleSwitch checked readonly>Switch (checked)</ToggleSwitch>
      <ToggleSwitch :checked="false" readonly>Switch (unchecked)</ToggleSwitch>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex space-x-4 justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch" disabled>Switch</ToggleSwitch>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Without labels</div>

    <div class="flex justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch" />
    </div>
  </div>
</template>
