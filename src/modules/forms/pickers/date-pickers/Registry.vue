<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
// import DatePicker from '~/components/DatePicker.vue';
// import DateRangePicker from '~/components/DateRangePicker.vue';

const flux = reactive({
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Forms', disabled: true },
      { text: 'Pickers', disabled: true },
      { text: 'Date pickers', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Date pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <!-- <DatePicker /> -->
    </div>
  </div>
</template>
