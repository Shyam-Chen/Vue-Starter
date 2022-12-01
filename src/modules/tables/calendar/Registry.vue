<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Calendar from '~/components/Calendar.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Tables', disabled: true },
      { text: 'Calendar', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Calendar</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Calendar />
    </div>
  </div>
</template>
