<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Breadcrumbs' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Breadcrumbs</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <XBreadcrumb
      :items="[{ text: 'Dashboard', href: '#' }, { text: 'Link 1', href: '#' }, { text: 'Link 2' }]"
    />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Divider</div>

    <XBreadcrumb
      :items="[{ text: 'Dashboard', href: '#' }, { text: 'Link 1', href: '#' }, { text: 'Link 2' }]"
    >
      <template #divider>
        <div class="i-fa-arrow-right w-3 h-3"></div>
      </template>
    </XBreadcrumb>
  </div>
</template>
