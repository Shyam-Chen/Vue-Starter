<script lang="ts" setup>
import { reactive } from 'vue';

import TextField from '~/components/TextField.vue';
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
  <div class="w-full max-w-2xl">
    <form class="bg-white dark:bg-slate-800 shadow-md rounded px-8 py-6">
      <div class="text-2xl font-bold mb-4">Form</div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <TextField
          v-model:value="state.signInForm.username"
          :error-message="state.errors['signInForm.username']"
        >
          Username
        </TextField>

        <TextField
          v-model:value="state.signInForm.password"
          type="password"
          :error-message="state.errors['signInForm.password']"
        >
          Password
        </TextField>

        <TextField
          v-model:value="state.signInForm.email"
          type="email"
          :error-message="state.errors['signInForm.email']"
        >
          Email
        </TextField>
      </div>

      <div class="flex items-center justify-between">
        <Button color="primary" @click="flux.submit">Submit</Button>
      </div>
    </form>
  </div>
</template>
