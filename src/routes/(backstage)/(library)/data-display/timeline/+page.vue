<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Timeline from '~/components/Timeline.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Timeline', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Timeline</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Timeline />
  </div>
</template>
