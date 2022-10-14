<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Tabs from '~/components/Tabs.vue';
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

    <Tabs />
  </div>
</template>
