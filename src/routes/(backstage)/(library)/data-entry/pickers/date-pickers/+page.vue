<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import DatePicker from '~/components/DatePicker.vue';
import DateRangePicker from '~/components/DateRangePicker.vue';

const flux = reactive({
  datePicker: '',
  datePickerStartDate: '',
  datePickerEndDate: '',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'Date pickers' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Date pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <DatePicker v-model:value="flux.datePicker" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Error messages</div>

    <div class="flex justify-center">
      <DatePicker v-model:value="flux.datePicker" errorMessage="This is a required field" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Range</div>

    <div class="flex justify-center">
      <DateRangePicker
        v-model:startValue="flux.datePickerStartDate"
        v-model:endValue="flux.datePickerEndDate"
      />
    </div>

    <div class="mt-2">
      <div>Start Date: {{ flux.datePickerStartDate }}</div>
      <div>End Date: {{ flux.datePickerEndDate }}</div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Range with error messages</div>

    <div class="flex justify-center">
      <DateRangePicker
        v-model:startValue="flux.datePickerStartDate"
        v-model:endValue="flux.datePickerEndDate"
        errorMessage="This is a required field"
      />
    </div>
  </div>
</template>
