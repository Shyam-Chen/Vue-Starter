<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Tooltip from '~/components/Tooltip.vue';
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tooltip' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tooltip</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-between">
      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>

      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-between">
      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>

      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Tooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  </div>
</template>
