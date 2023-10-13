<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Tabs from '~/components/Tabs.vue';

const flux = reactive({
  tabs1: 0,
  tabs2: 'vue',
  tabs3: 0,
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
      <div class="text-red-500 p-4">Angular Content</div>
    </Tabs.Tab>

    <Tabs.Tab title="React">
      <div class="text-blue-500 p-4">React Content</div>
    </Tabs.Tab>

    <Tabs.Tab title="Svelte">
      <div class="text-orange-500 p-4">Svelte Content</div>
    </Tabs.Tab>

    <Tabs.Tab title="Vue">
      <div class="text-green-500 p-4">Vue Content</div>
    </Tabs.Tab>
  </Tabs>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Values</div>

    <Tabs
      v-model="flux.tabs2"
      class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
    >
      <Tabs.Tab title="Angular" value="angular">
        <div class="text-red-500 p-4">Angular Content</div>
      </Tabs.Tab>

      <Tabs.Tab title="React" value="react">
        <div class="text-blue-500 p-4">React Content</div>
      </Tabs.Tab>

      <Tabs.Tab title="Svelte" value="svelte">
        <div class="text-orange-500 p-4">Svelte Content</div>
      </Tabs.Tab>

      <Tabs.Tab title="Vue" value="vue">
        <div class="text-green-500 p-4">Vue Content</div>
      </Tabs.Tab>
    </Tabs>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Overflow</div>

    <Tabs
      v-model="flux.tabs3"
      class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
    >
      <Tabs.Tab v-for="num in 20" :key="num" :title="`Tab ${num}`">
        <div class="text-red-500 p-4">Content {{ num }}</div>
      </Tabs.Tab>
    </Tabs>
  </div>
</template>
