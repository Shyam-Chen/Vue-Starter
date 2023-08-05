<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import RadioGroup from '~/components/RadioGroup.vue';
import Select from '~/components/Select.vue';
import Checkbox from '~/components/Checkbox.vue';
import CheckboxGroup from '~/components/CheckboxGroup.vue';
import Button from '~/components/Button.vue';

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
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Form validation' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Form validation</div>
  </div>

  <div class="grid gap-6 w-full">
    <form class="bg-white dark:bg-slate-800 shadow-md rounded px-8 py-6">
      <div class="text-2xl font-bold mb-4">Zod Form</div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <TextField
          v-model:value="state.zodForm.username"
          label="Username"
          :errorMessage="state.zodValdn.username"
        />
        <TextField
          v-model:value="state.zodForm.password"
          label="Password"
          type="password"
          :errorMessage="state.zodValdn.password"
        />

        <TextField
          v-model:value="state.zodForm.email"
          label="Email"
          type="email"
          :errorMessage="state.zodValdn.email"
        />
        <TextField
          v-model:value="state.zodForm.phone"
          label="Phone"
          type="tel"
          :errorMessage="state.zodValdn.phone"
        />

        <RadioGroup
          v-model:value="state.zodForm.gender"
          label="Gender"
          :options="['Male', 'Female', 'Others']"
          :errorMessage="state.zodValdn.gender"
        />
        <Select
          label="Plan"
          :options="[
            { label: 'Individual', value: 1 },
            { label: 'Team', value: 2 },
            { label: 'Organization', value: 3 },
            { label: 'Enterprise', value: 4 },
          ]"
        />

        <Checkbox class="col-span-2">Employed</Checkbox>

        <CheckboxGroup
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
        <Button color="primary" @click="flux.submitZodForm">Submit</Button>
      </div>
    </form>
  </div>
</template>
