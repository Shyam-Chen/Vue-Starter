<script lang="ts" setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { useState, useActions } from './store';
import { useBasicFormsSchema } from './schema';

const { t } = useI18n({ useScope: 'local' });

const state = useState();
const actions = useActions();
const schema = useBasicFormsSchema();

const flux = reactive({
  signIn() {
    schema.stop(); // TODO: effectScope

    if (schema.validate()) {
      actions.signIn();
    }
  },
});
</script>

<template>
  <div>
    <div>{{ t('formValidation') }}</div>

    <div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="state.basicForms.email" type="email" class="border" />
        <div>{{ state.errors['basicForms.email'] }}</div>
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="state.basicForms.password" type="password" class="border" />
        <div>{{ state.errors['basicForms.password'] }}</div>
      </div>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="flux.signIn"
      >
        Sign in
      </button>
    </div>

    <pre>{{ state.basicForms }}</pre>

    <pre>{{ state.errors }}</pre>
  </div>
</template>

<i18n locale="en-US" src="./_locales/en-US.json5"></i18n>
<i18n locale="ja-JP" src="./_locales/ja-JP.json5"></i18n>
<i18n locale="ko-KR" src="./_locales/ko-KR.json5"></i18n>
<i18n locale="zh-TW" src="./_locales/zh-TW.json5"></i18n>
