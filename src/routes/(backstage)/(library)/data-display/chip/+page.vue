<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Chip from '~/components/Chip.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Chip', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Chip</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center gap-15">
      <Chip>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail</div>
      </Chip>
    </div>

    <div class="flex justify-center items-center gap-15 mt-6">
      <Chip>
        <div>Link something</div>
      </Chip>
    </div>
  </div>
</template>
