<script lang="ts" setup>
import { reactive } from 'vue';
import {
  XBreadcrumb,
  XTextField,
  XRadioGroup,
  XSelect,
  XCheckbox,
  XCheckboxGroup,
  XButton,
} from '@x/ui';

import ZodFormTouch from './ZodFormTouch.vue';
import TabularForms from './TabularForms.vue';
import TabularFormGroups from './TabularFormGroups.vue';
import useStore from './store';
import { useZodFormSchema } from './schema';

const { state, actions } = useStore();
const zodFormSchema = useZodFormSchema();

const flux = reactive({
  submitZodForm() {
    if (zodFormSchema.validate()) {
      actions.submit();
    }
  },
});
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Form Validation' }]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Form Validation</div>
  </div>

  <div class="grid gap-6 w-full my-4">
    <form class="bg-white dark:bg-slate-800 shadow-md rounded px-8 py-6">
      <div class="text-2xl font-bold mb-4">Zod Form</div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <XTextField
          v-model:value="state.zodForm.username"
          label="Username"
          required
          :errorMessage="state.zodValdn.username"
        />
        <XTextField
          v-model:value="state.zodForm.password"
          label="Password"
          type="password"
          required
          :errorMessage="state.zodValdn.password"
        />

        <XTextField
          v-model:value="state.zodForm.email"
          label="Email"
          type="email"
          required
          :errorMessage="state.zodValdn.email"
        />
        <XTextField
          v-model:value="state.zodForm.phone"
          label="Phone"
          type="tel"
          required
          :errorMessage="state.zodValdn.phone"
        />

        <XRadioGroup
          v-model:value="state.zodForm.gender"
          label="Gender"
          :options="['Male', 'Female', 'Others']"
          required
          :errorMessage="state.zodValdn.gender"
        />
        <XSelect
          v-model:value="state.zodForm.plan"
          label="Plan"
          :options="[
            { label: 'Individual', value: '1' },
            { label: 'Team', value: '2' },
            { label: 'Organization', value: '3' },
            { label: 'Enterprise', value: '4' },
          ]"
          required
          :errorMessage="state.zodValdn.plan"
        />

        <div>
          <div class="text-sm mb-2 font-bold">Status</div>
          <XCheckbox v-model:value="state.zodForm.status" class="col-span-2">Employed</XCheckbox>
        </div>

        <XCheckboxGroup
          v-model:value="state.zodForm.sauces"
          label="Sauces"
          :options="[
            { label: 'Ketchup', value: 1 },
            { label: 'Mustard', value: 2 },
            { label: 'Salsa', value: 3 },
            { label: 'Guacamole', value: 4 },
          ]"
        />
      </div>

      <div class="flex items-center justify-between">
        <XButton color="primary" @click="flux.submitZodForm">Submit</XButton>
      </div>
    </form>
  </div>

  <ZodFormTouch />

  <TabularForms />
  <TabularFormGroups />
</template>
