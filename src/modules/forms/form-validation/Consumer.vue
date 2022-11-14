<script lang="ts" setup>
import { reactive } from 'vue';
// import { useI18n } from 'vue-i18n';

import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from './provider';
import { useSignInFormSchema } from './schema';

// const { t } = useI18n({ useScope: 'local' });

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
    <form class="bg-white shadow-md rounded px-8 py-6">
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

<i18n locale="en-US" src="./_locales/en-US.json5"></i18n>
<i18n locale="ja-JP" src="./_locales/ja-JP.json5"></i18n>
<i18n locale="ko-KR" src="./_locales/ko-KR.json5"></i18n>
<i18n locale="zh-TW" src="./_locales/zh-TW.json5"></i18n>
