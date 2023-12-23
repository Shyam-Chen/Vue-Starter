<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XDatePicker, XDateRangePicker } from '@x/ui';
import { subDays, addDays, format } from 'date-fns';

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
      { text: 'DatePicker' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">DatePicker</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XDatePicker v-model:value="flux.datePicker" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Min/Max Date</h2>

    <XCard>
      <XDatePicker
        v-model:value="flux.datePicker"
        :minDate="subDays(new Date(), 1)"
        :maxDate="addDays(new Date(), 6)"
      />

      <div class="mt-1">
        <div>Min Date: {{ format(subDays(new Date(), 1), 'yyyy-MM-dd') }}</div>
        <div>Max Date: {{ format(addDays(new Date(), 6), 'yyyy-MM-dd') }}</div>
      </div>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Min</h3>

      <XCard>
        <XDatePicker v-model:value="flux.datePicker" :minDate="subDays(new Date(), 1)" />

        <div class="mt-1">
          <div>Min Date: {{ format(subDays(new Date(), 1), 'yyyy-MM-dd') }}</div>
        </div>
      </XCard>
    </section>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Max</h3>

      <XCard>
        <XDatePicker v-model:value="flux.datePicker" :maxDate="addDays(new Date(), 6)" />

        <div class="mt-1">
          <div>Max Date: {{ format(addDays(new Date(), 6), 'yyyy-MM-dd') }}</div>
        </div>
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">DateRangePicker</h2>

    <XCard>
      <XDateRangePicker
        v-model:startValue="flux.datePickerStartDate"
        v-model:endValue="flux.datePickerEndDate"
      />

      <div class="mt-1">
        <div>Start Date: {{ flux.datePickerStartDate }}</div>
        <div>End Date: {{ flux.datePickerEndDate }}</div>
      </div>
    </XCard>
  </section>
</template>
