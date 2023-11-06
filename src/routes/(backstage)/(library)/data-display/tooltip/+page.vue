<script lang="ts" setup>
import { XBreadcrumb, XTooltip } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tooltip' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Tooltip</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-between">
      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>

      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-between">
      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>

      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>
    </div>
  </div>
</template>
