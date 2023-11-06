<script lang="ts" setup>
import { XBreadcrumb, XChip } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Chip' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Chip</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div class="font-bold">Basic</div>

    <div class="flex flex-wrap justify-center items-center gap-4">
      <XChip>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (primary)</div>
      </XChip>

      <XChip color="secondary">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (secondary)</div>
      </XChip>

      <XChip color="success">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (success)</div>
      </XChip>

      <XChip color="warning">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (warning)</div>
      </XChip>

      <XChip color="danger">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (danger)</div>
      </XChip>

      <XChip color="info">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (info)</div>
      </XChip>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-4">
      <XChip closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (primary)</div>
      </XChip>

      <XChip color="secondary" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (secondary)</div>
      </XChip>

      <XChip color="success" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (success)</div>
      </XChip>

      <XChip color="warning" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (warning)</div>
      </XChip>

      <XChip color="danger" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (danger)</div>
      </XChip>

      <XChip color="info" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (info)</div>
      </XChip>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-4">
      <XChip disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (primary)</div>
      </XChip>

      <XChip color="secondary" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (secondary)</div>
      </XChip>

      <XChip color="success" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (success)</div>
      </XChip>

      <XChip color="warning" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (warning)</div>
      </XChip>

      <XChip color="danger" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (danger)</div>
      </XChip>

      <XChip color="info" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (info)</div>
      </XChip>
    </div>
  </div>
</template>
