<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Tabs from '~/components/Tabs.vue';

const flux = reactive({
  tabs1: 0,
  tabs2: 'vue',
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Tabs' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Tabs</div>
  </div>

  <Tabs
    v-model="flux.tabs1"
    class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
  >
    <Tabs.Tab title="Angular">
      <div>Angular Content</div>
    </Tabs.Tab>

    <Tabs.Tab title="React">
      <div>React Content</div>
    </Tabs.Tab>

    <Tabs.Tab title="Svelte">
      <div>Svelte Content</div>
    </Tabs.Tab>

    <Tabs.Tab title="Vue">
      <div>Vue Content</div>
    </Tabs.Tab>
  </Tabs>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Values</div>

    <Tabs
      v-model="flux.tabs2"
      class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
    >
      <Tabs.Tab title="Angular" value="angular">
        <div class="text-red-500">Angular Content</div>
      </Tabs.Tab>

      <Tabs.Tab title="React" value="react">
        <div class="text-blue-500">React Content</div>
      </Tabs.Tab>

      <Tabs.Tab title="Svelte" value="svelte">
        <div class="text-orange-500">Svelte Content</div>
      </Tabs.Tab>

      <Tabs.Tab title="Vue" value="vue">
        <div class="text-green-500">Vue Content</div>
      </Tabs.Tab>
    </Tabs>
  </div>
</template>
