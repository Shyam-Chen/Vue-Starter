<script lang="ts" setup>
import { XBreadcrumb, XTabs } from '@x/ui';
import { watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import useStore from './store';

const route = useRoute();

const { state } = useStore();

watch(
  () => route.params.tab,
  (val) => {
    const tabsMap = new Map([
      ['angular', 0],
      ['react', 1],
      ['svelte', 2],
      ['vue', 3],
    ]);

    state.currentTab = tabsMap.get(val as string) || 0;
  },
  { immediate: true },
);
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Navigation' },
      { text: 'Tabs', to: '/navigation/tabs' },
      { text: 'Routing Tabs' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">Routing Tabs</h1>

  <XTabs v-model="state.currentTab">
    <XTabs.Tab title="Angular" to="/navigation/tabs/routing-angular" />
    <XTabs.Tab title="React" to="/navigation/tabs/routing-react" />
    <XTabs.Tab title="Svelte" to="/navigation/tabs/routing-svelte" />
    <XTabs.Tab title="Vue" to="/navigation/tabs/routing-vue" />
  </XTabs>

  <div class="p-4 lg:p-6">
    <RouterView />
  </div>
</template>
