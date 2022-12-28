<script lang="ts" setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';
import Spinner from '~/components/Spinner.vue';

import useLocale from './_locales';
import { useState, useActions } from './provider';
import { useSignInFormSchema } from './schema';

const locale = useLocale();
const state = useState();
const actions = useActions();
const schema = useSignInFormSchema();

const flux = reactive({
  signIn() {
    if (schema.validate()) {
      actions.signIn();
    }
  },
});
</script>

<template>
  <div class="w-full max-w-sm">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div class="mb-8">
        <div class="font-bold text-xl mb-2">{{ locale.title }}</div>
        <p class="text-gray-700 text-base">{{ locale.subtitle }}</p>
      </div>

      <div class="mb-4">
        <TextField
          v-model:value="state.signInForm.username"
          required
          :errorMessage="state.errors['signInForm.username']"
          :disabled="state.signedIn"
        >
          {{ locale.username }}
        </TextField>
      </div>

      <div class="mb-8">
        <TextField
          v-model:value="state.signInForm.password"
          type="password"
          required
          :errorMessage="state.errors['signInForm.password']"
          :disabled="state.signedIn"
        >
          {{ locale.password }}
        </TextField>
      </div>

      <div class="flex items-center justify-between">
        <Button color="primary" :disabled="state.signedIn" class="w-32" @click="flux.signIn">
          <Spinner v-if="state.signedIn" class="w-3 h-3 border-2 align-middle" />
          <div v-else>{{ locale.signIn }}</div>
        </Button>

        <RouterLink
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/forgot-password"
        >
          {{ locale.forgotPassword }}
        </RouterLink>
      </div>
    </form>
  </div>
</template>
