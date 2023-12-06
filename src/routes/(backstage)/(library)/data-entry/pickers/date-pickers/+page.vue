<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XDatePicker, XDateRangePicker } from '@x/ui';

const flux = reactive({
  datePicker: '',
  datePickerStartDate: '',
  datePickerEndDate: '',
});
</script>

<template>
  <XBreadcrumb
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
      <XDatePicker v-model:value="flux.datePicker" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Error messages</div>

    <div class="flex justify-center">
      <XDatePicker v-model:value="flux.datePicker" invalid="This is a required field" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Range</div>

    <div class="flex justify-center">
      <XDateRangePicker
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
      <XDateRangePicker
        v-model:startValue="flux.datePickerStartDate"
        v-model:endValue="flux.datePickerEndDate"
        invalid="This is a required field"
      />
    </div>
  </div>
</template>
