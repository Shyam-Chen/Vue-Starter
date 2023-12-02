<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XTabs } from '@x/ui';

const flux = reactive({
  tabControlled: 0,
  tabControlledCustomValue: 'vue',
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Tabs' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Tabs</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4">Basic</div>

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
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Dynamic</div>

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
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Controlled</div>

    <div class="flex mb-2">
      Active Index:
      <div>
        <code class="text-sm text-gray-700 bg-gray-300 ml-2 px-2 rounded">
          {{ flux.tabControlled }}
        </code>
      </div>
    </div>

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

    <div class="text-2xl font-semibold my-4">Custom Value</div>

    <div class="flex mb-2">
      Active Value:
      <div>
        <code class="text-sm text-gray-700 bg-gray-300 ml-2 px-2 rounded">
          {{ flux.tabControlledCustomValue }}
        </code>
      </div>
    </div>

    <XTabs v-model="flux.tabControlledCustomValue">
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

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Scrollable</div>

    <XTabs>
      <XTabs.Tab v-for="num in 20" :key="num" :title="`Tab ${num}`">
        <div class="text-red-500 p-4">Content {{ num }}</div>
      </XTabs.Tab>
    </XTabs>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Disabled</div>

    <XTabs>
      <XTabs.Tab title="Angular">
        <div class="text-red-500 p-4">Angular Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="React" :disabled="true">
        <div class="text-blue-500 p-4">React Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="Svelte">
        <div class="text-orange-500 p-4">Svelte Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="Vue">
        <div class="text-green-500 p-4">Vue Content</div>
      </XTabs.Tab>
    </XTabs>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Closeable</div>

    <XTabs closeable>
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
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Template</div>

    <XTabs>
      <XTabs.Tab>
        <template #title>
          <div class="i-simple-icons-angular w-5 h-5 mr-1"></div>
          <div>Angular</div>
        </template>

        <div class="text-red-500 p-4">Angular Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="React">
        <template #title>
          <div class="i-simple-icons-react w-5 h-5 mr-1"></div>
          <div>React</div>
        </template>

        <div class="text-blue-500 p-4">React Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="Svelte">
        <template #title>
          <div class="i-simple-icons-svelte w-5 h-5 mr-1"></div>
          <div>Svelte</div>
        </template>

        <div class="text-orange-500 p-4">Svelte Content</div>
      </XTabs.Tab>

      <XTabs.Tab title="Vue">
        <template #title>
          <div class="i-simple-icons-vuedotjs w-5 h-5 mr-1"></div>
          <div>Vue</div>
        </template>

        <div class="text-green-500 p-4">Vue Content</div>
      </XTabs.Tab>
    </XTabs>
  </div>
</template>
