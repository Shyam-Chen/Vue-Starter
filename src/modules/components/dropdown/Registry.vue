<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Dropdown from '~/components/Dropdown.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Components', disabled: true },
      { text: 'Dropdown', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Dropdown</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Dropdown :options="['Action', 'Another action', 'Something else here']">Dropdown button</Dropdown>
    </div>
  </div>
</template>
