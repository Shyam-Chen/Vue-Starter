<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Breadcrumbs' }]" />

  <h1 class="text-4xl font-extrabold my-4">Breadcrumb</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XBreadcrumb
        :items="[
          { text: 'Dashboard', href: '#' },
          { text: 'Link 1', href: '#' },
          { text: 'Link 2' },
        ]"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Divider</h2>

    <XCard>
      <XBreadcrumb
        :items="[
          { text: 'Dashboard', href: '#' },
          { text: 'Link 1', href: '#' },
          { text: 'Link 2' },
        ]"
      >
        <template #divider>
          <div class="i-fa-arrow-right w-3 h-3"></div>
        </template>
      </XBreadcrumb>
    </XCard>
  </section>
</template>
