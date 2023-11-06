<script lang="ts" setup>
import { XBreadcrumb, XBadge } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Badge' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Badge</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center gap-15">
      <XBadge>
        <div class="w-6 h-6 i-fa-envelope"></div>
      </XBadge>

      <XBadge count="7">
        <div class="w-6 h-6 i-fa-envelope"></div>
      </XBadge>

      <XBadge count="77">
        <div class="w-6 h-6 i-fa-envelope"></div>
      </XBadge>

      <XBadge count="99+">
        <div class="w-6 h-6 i-fa-envelope"></div>
      </XBadge>
    </div>

    <div class="flex justify-center items-center gap-15 mt-6">
      <XBadge>
        <div>Link something</div>
      </XBadge>
    </div>
  </div>
</template>
