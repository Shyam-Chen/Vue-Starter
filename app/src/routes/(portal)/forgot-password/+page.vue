<script lang="ts" setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { XButton, XLink, XTextField } from '@x/ui';

import useStore from './store';
import useSchema from './schema';

const { state } = useStore();
const schema = useSchema();

const flux = reactive({
  flow: 1,

  send() {
    if (schema.validate()) {
      flux.flow = 2;
    }
  },

  code: '',
  inputCode() {
    if (flux.code.length === 6) flux.flow = 3;
  },
  resend() {
    // ...
  },
});
</script>

<template>
  <div class="w-full max-w-sm">
    <form
      v-if="flux.flow === 1"
      class="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8"
    >
      <div class="mb-8">
        <div class="text-slate-900 dark:text-white font-bold text-xl mb-2">Forgot password?</div>
        <div>No worries, we'll send you reset instructions.</div>
      </div>

      <div class="mb-8">
        <XTextField
          v-model:value="state.form.email"
          label="Email"
          required
          :invalid="state.valdn.email"
        />
      </div>

      <XButton class="w-full mb-6" @click="flux.send">Send</XButton>

      <XLink to="/sign-in" class="flex justify-center">
        <div class="i-ic-round-arrow-back w-5 h-5"></div>
        <div>Back to sign in</div>
      </XLink>
    </form>

    <form
      v-if="flux.flow === 2"
      class="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8"
    >
      <div class="mb-8">
        <div class="text-slate-900 dark:text-white font-bold text-xl mb-2">Check your email</div>
        <div>We have sent a verification code to your email.</div>
      </div>

      <div class="mb-8 space-y-2">
        <div>Enter the 6-digit verification code from your email:</div>

        <XTextField
          v-model:value="flux.code"
          class="text-center"
          maxlength="6"
          @input="flux.inputCode"
        />
      </div>

      <div class="mb-4">
        Didn't receive the email?
        <div
          class="inline-flex font-bold text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
        >
          Click to resend
        </div>
      </div>
    </form>

    <form
      v-if="flux.flow === 3"
      class="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8"
    >
      <div class="w-12 h-12 i-lucide-check-circle text-green-500 mx-auto my-0 mb-6"></div>

      <div class="text-slate-900 dark:text-white font-bold text-xl mb-4 text-center">
        Password Reset
      </div>

      <div class="mb-6">
        Your password has been successfully reset. Click below to sign-in magically with your new
        password.
      </div>

      <div class="mb-8">
        <XTextField value="2803bn3VO7" readonly>Your New Password:</XTextField>
      </div>

      <RouterLink
        class="flex font-bold text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 space-x-1"
        to="/sign-in"
        replace
      >
        <XButton class="w-full">Continue</XButton>
      </RouterLink>
    </form>
  </div>
</template>
