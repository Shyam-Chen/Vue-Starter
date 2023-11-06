<script lang="ts" setup>
import { XBreadcrumb, XPopover, XButton } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Popover' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Popover</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center gap-15">
      <XPopover>
        <XButton icon="i-fa-envelope" />

        <template #content>
          <div class="px-4 py-2">The content of the Popover.</div>
        </template>
      </XPopover>
    </div>
  </div>
</template>
