<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Transfer from '~/components/Transfer.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Transfer', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Transfer</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Transfer />
    </div>
  </div>
</template>
