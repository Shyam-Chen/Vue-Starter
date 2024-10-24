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
          { text: 'Home', to: '/navigation/breadcrumbs' },
          { text: 'Projects', href: '#breadcrumb' },
          { text: 'Flowbite' },
        ]"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Icon</h2>

    <XCard>
      <XBreadcrumb
        :items="[
          { icon: 'i-material-symbols-house-rounded', to: '/navigation/breadcrumbs' },
          { icon: 'i-material-symbols-folder-rounded', text: 'Projects', href: '#breadcrumb' },
          { icon: 'i-material-symbols-local-fire-department-rounded', text: 'Flowbite' },
        ]"
      />
    </XCard>
  </section>
</template>
