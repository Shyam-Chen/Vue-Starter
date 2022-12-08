<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import ToggleSwitch from '~/components/ToggleSwitch.vue';

const flux = reactive({
  toggleSwitch1: false,
  toggleSwitch2: true,
  toggleSwitch3: false,
  toggleSwitch4: true,
  toggleSwitch5: false,
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Switches', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Switches</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch1"
        >Switch 1: {{ flux.toggleSwitch1 }}</ToggleSwitch
      >
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Checked</div>

    <div class="flex justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch2"
        >Switch 2 {{ flux.toggleSwitch2 }}</ToggleSwitch
      >
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex space-x-4 justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch3" disabled
        >Switch 3 {{ flux.toggleSwitch3 }}</ToggleSwitch
      >

      <ToggleSwitch v-model:value="flux.toggleSwitch4" disabled
        >Switch 4 {{ flux.toggleSwitch4 }}</ToggleSwitch
      >
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Without labels</div>

    <div class="flex justify-center">
      <ToggleSwitch v-model:value="flux.toggleSwitch5" />
    </div>
  </div>
</template>
