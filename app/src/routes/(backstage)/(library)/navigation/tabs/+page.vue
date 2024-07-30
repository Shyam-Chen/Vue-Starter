<script lang="ts" setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { XBreadcrumb, XButton, XCard, XCode, XTabs } from '@x/ui';

import TabsInDialog from './TabsInDialog.vue';

const flux = reactive({
  tabControlled: 3,
  tabControlledCustomValue: 'vue',
});

function onChange(val: string | number | undefined) {
  console.log(val);
}

function onClose(val: string | number | undefined) {
  console.log(val);
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Tabs' }]" />

  <h1 class="text-4xl font-extrabold my-4">Tabs</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTabs>
        <XTabs.Tab title="Angular">
          <div class="text-rose-500 p-4">Angular Content</div>
        </XTabs.Tab>

        <XTabs.Tab title="React">
          <div class="text-sky-500 p-4">React Content</div>
        </XTabs.Tab>

        <XTabs.Tab title="Svelte">
          <div class="text-amber-500 p-4">Svelte Content</div>
        </XTabs.Tab>

        <XTabs.Tab title="Vue">
          <div class="text-emerald-500 p-4">Vue Content</div>
        </XTabs.Tab>
      </XTabs>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Dynamic</h2>

    <XCard>
      <XTabs>
        <XTabs.Tab
          v-for="tab in [
            { title: 'Tab 1', content: 'Tab 1 Content' },
            { title: 'Tab 2', content: 'Tab 2 Content' },
            { title: 'Tab 3', content: 'Tab 3 Content' },
          ]"
          :key="tab.title"
          :title="tab.title"
        >
          <div class="text-emerald-500 p-4">{{ tab.content }}</div>
        </XTabs.Tab>
      </XTabs>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Controlled</h2>

    <div class="flex items-center gap-2 my-2">
      <div>Active Index:</div>
      <XCode>{{ flux.tabControlled }}</XCode>
    </div>

    <XCard>
      <XTabs v-model="flux.tabControlled">
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
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Custom Value</h3>

      <div class="flex items-center gap-2 my-2">
        <div>Active Value:</div>
        <XCode>{{ flux.tabControlledCustomValue }}</XCode>
      </div>

      <XCard>
        <XTabs v-model="flux.tabControlledCustomValue" @change="onChange">
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
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Scrollable</h2>

    <XCard>
      <XTabs>
        <XTabs.Tab v-for="num in 20" :key="num" :title="`Tab ${num}`">
          <div class="text-red-500 p-4">Content {{ num }}</div>
        </XTabs.Tab>
      </XTabs>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold mb-4 pt-6">Disabled</h2>

    <XCard>
      <XTabs>
        <XTabs.Tab title="Angular">
          <div class="text-red-500 p-4">Angular Content</div>
        </XTabs.Tab>

        <XTabs.Tab title="React" disabled>
          <div class="text-blue-500 p-4">React Content</div>
        </XTabs.Tab>

        <XTabs.Tab title="Svelte">
          <div class="text-orange-500 p-4">Svelte Content</div>
        </XTabs.Tab>

        <XTabs.Tab title="Vue">
          <div class="text-green-500 p-4">Vue Content</div>
        </XTabs.Tab>
      </XTabs>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold mb-4 pt-6">Closeable</h2>

    <XCard>
      <XTabs closeable @close="onClose">
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
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold mb-4 pt-6">Template</h2>

    <XCard>
      <XTabs>
        <XTabs.Tab>
          <template #title>
            <div class="i-simple-icons-angular w-5 h-5 mr-1"></div>
            <div>Angular</div>
          </template>

          <div class="text-red-500 p-4">Angular Content</div>
        </XTabs.Tab>

        <XTabs.Tab>
          <template #title>
            <div class="i-simple-icons-react w-5 h-5 mr-1"></div>
            <div>React</div>
          </template>

          <div class="text-blue-500 p-4">React Content</div>
        </XTabs.Tab>

        <XTabs.Tab>
          <template #title>
            <div class="i-simple-icons-svelte w-5 h-5 mr-1"></div>
            <div>Svelte</div>
          </template>

          <div class="text-orange-500 p-4">Svelte Content</div>
        </XTabs.Tab>

        <XTabs.Tab>
          <template #title>
            <div class="i-simple-icons-vuedotjs w-5 h-5 mr-1"></div>
            <div>Vue</div>
          </template>

          <div class="text-green-500 p-4">Vue Content</div>
        </XTabs.Tab>
      </XTabs>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold mb-4 pt-6">Routing Tabs</h2>

    <XCard>
      <RouterLink to="/navigation/tabs/routing-vue">
        <XButton label="Go check it out" />
      </RouterLink>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold mb-4 pt-6">Tabs in Dialog</h2>

    <XCard>
      <TabsInDialog />
    </XCard>
  </section>
</template>
