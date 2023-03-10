<script lang="ts" setup>
import { reactive } from 'vue';

import TextField from '~/components/TextField.vue';
import RadioGroup from '~/components/RadioGroup.vue';
import Select from '~/components/Select.vue';
import Checkbox from '~/components/Checkbox.vue';
import CheckboxGroup from '~/components/CheckboxGroup.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from './provider';
import { useSignInFormSchema } from './schema';

const state = useState();
const actions = useActions();
const schema = useSignInFormSchema();

const flux = reactive({
  submit() {
    if (schema.validate()) {
      actions.submit();
    }
  },
});
</script>

<template>
  <div class="w-full">
    <form class="bg-white dark:bg-slate-800 shadow-md rounded px-8 py-6">
      <div class="text-2xl font-bold mb-4">Form</div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <TextField
          v-model:value="state.signInForm.username"
          label="Username"
          :errorMessage="state.errors['signInForm.username']"
        />
        <TextField
          v-model:value="state.signInForm.password"
          label="Password"
          type="password"
          :errorMessage="state.errors['signInForm.password']"
        />

        <TextField
          v-model:value="state.signInForm.email"
          label="Email"
          type="email"
          :errorMessage="state.errors['signInForm.email']"
        />
        <TextField
          v-model:value="state.signInForm.phone"
          label="Phone"
          type="tel"
          :errorMessage="state.errors['signInForm.phone']"
        />

        <RadioGroup
          v-model:value="state.signInForm.gender"
          label="Gender"
          :options="['Male', 'Female', 'Others']"
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
        <Button color="primary" @click="flux.submit">Submit</Button>
      </div>
    </form>
  </div>
</template>
