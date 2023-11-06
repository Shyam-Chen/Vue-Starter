<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XTabs } from '@x/ui';

const flux = reactive({
  tabs1: 0,
  tabs2: 'vue',
  tabs3: 0,
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Tabs' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Tabs</div>
  </div>

  <XTabs
    v-model="flux.tabs1"
    class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
  >
    <XTabs.Tab title="Angular">
      <div class="text-red-500 p-4">Angular Content</div>
    </XTabs.Tab>

    <XTabs.Tab title="React">
      <div class="text-blue-500 p-4">React Content</div>
    </XTabs.Tab>

    <XTabs.Tab title="Svelte">
      <div class="text-orange-500 p-4">Svelte Content</div>
    </XTabs.Tab>

    <XTabs.Tab title="Vue">
      <div class="text-green-500 p-4">Vue Content</div>
    </XTabs.Tab>
  </XTabs>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Values</div>

    <XTabs
      v-model="flux.tabs2"
      class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
    >
      <XTabs.Tab title="Angular" value="angular">
        <div class="text-red-500 p-4">Angular Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="React" value="react">
        <div class="text-blue-500 p-4">React Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="Svelte" value="svelte">
        <div class="text-orange-500 p-4">Svelte Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="Vue" value="vue">
        <div class="text-green-500 p-4">Vue Content</div>
      </XTabs.Tab>
    </XTabs>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Overflow</div>

    <XTabs
      v-model="flux.tabs3"
      class="my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
    >
      <XTabs.Tab v-for="num in 20" :key="num" :title="`Tab ${num}`">
        <div class="text-red-500 p-4">Content {{ num }}</div>
      </XTabs.Tab>
    </XTabs>
  </div>
</template>
