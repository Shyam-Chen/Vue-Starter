<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Spinner from '~/components/Spinner.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Progress', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Progress</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-4">
      <Spinner class="w-4 h-4" />
      <Spinner />
      <Spinner class="w-12 h-12" />
    </div>
  </div>
</template>
