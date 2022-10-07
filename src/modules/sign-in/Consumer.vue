<script lang="ts" setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from './store';
import { useSignInFormSchema } from './schema';

const { t } = useI18n({ useScope: 'local' });

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
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div class="mb-4">
        <div class="font-bold text-xl mb-2">Sign in to our platform</div>
        <p class="text-gray-700 text-base">Login here using your username and password</p>
      </div>

      <div class="mb-4">
        <TextField
          v-model:value="state.signInForm.username"
          :error-message="state.errors['signInForm.username']"
        >
          Username
        </TextField>
      </div>

      <div class="mb-6">
        <TextField
          v-model:value="state.signInForm.password"
          type="password"
          :error-message="state.errors['signInForm.password']"
        >
          Password
        </TextField>
      </div>

      <div
        v-if="state.signedIn"
        class="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-r-blue-600 rounded-full"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>

      <div class="flex items-center justify-between">
        <Button color="primary" :disabled="state.signedIn" @click="flux.signIn">Sign In</Button>

        <router-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/forgot-password"
        >
          Forgot Password?
        </router-link>
      </div>
    </form>
  </div>
</template>

<i18n locale="en-US" src="./_locales/en-US.json5"></i18n>
<i18n locale="ja-JP" src="./_locales/ja-JP.json5"></i18n>
<i18n locale="ko-KR" src="./_locales/ko-KR.json5"></i18n>
<i18n locale="zh-TW" src="./_locales/zh-TW.json5"></i18n>
