<script lang="ts" setup>
import { XButton, XDialog, XTabs } from '@x/ui';
import { ref } from 'vue';

const dialog = ref(false);
</script>

<template>
  <XButton label="Launch" @click="dialog = true" />

  <XDialog v-model="dialog" title="Tabs in Dialog">
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
  </XDialog>
</template>
