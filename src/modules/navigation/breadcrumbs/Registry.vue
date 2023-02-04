<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Breadcrumbs', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Breadcrumbs</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <Breadcrumbs
      :items="[
        { text: 'Dashboard', href: '#' },
        { text: 'Link 1', href: '#' },
        { text: 'Link 2', disabled: true },
      ]"
    />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Divider</div>

    <Breadcrumbs
      :items="[
        { text: 'Dashboard', href: '#' },
        { text: 'Link 1', href: '#' },
        { text: 'Link 2', disabled: true },
      ]"
    >
      <template #divider>
        <div class="i-fa-arrow-right w-3 h-3"></div>
      </template>
    </Breadcrumbs>
  </div>
</template>
