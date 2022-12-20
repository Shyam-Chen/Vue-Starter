<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'General', disabled: true },
      { text: 'Icons', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Icons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center space-x-4">
      <div class="i-fa-bell w-3 h-3 text-blue-500"></div>
      <div class="i-fa-bell w-10 h-10 text-yellow-500"></div>
    </div>
  </div>
</template>
