<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Tabs from '~/components/Tabs.vue';

const flux = reactive({
  tabs: 'vue',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Tabs', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tabs</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <Tabs v-model="flux.tabs">
      <Tabs.TabPanel title="Angular" value="angular">
        <div class="text-red-500">Angular Content</div>
      </Tabs.TabPanel>

      <Tabs.TabPanel title="React" value="react">
        <div class="text-blue-500">React Content</div>
      </Tabs.TabPanel>

      <Tabs.TabPanel title="Svelte" value="svelte">
        <div class="text-orange-500">Svelte Content</div>
      </Tabs.TabPanel>

      <Tabs.TabPanel title="Vue" value="vue">
        <div class="text-green-500">Vue Content</div>
      </Tabs.TabPanel>
    </Tabs>
  </div>
</template>
