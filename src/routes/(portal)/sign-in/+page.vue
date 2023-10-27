<script lang="ts" setup>
import { onUnmounted } from 'vue';

import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';
import Spinner from '~/components/Spinner.vue';
import Link from '~/components/Link.vue';

import useStore from './store';
import useSchema from './schema';
import useLocale from './locales';

const { state, actions, $reset } = useStore();
const schema = useSchema();
const locale = useLocale();

onUnmounted(() => {
  $reset();
});
</script>

<template>
  <div class="w-full max-w-sm m-6">
    <form
      v-if="!state.otpEnabled"
      class="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8"
    >
      <div class="mb-8">
        <div class="text-slate-900 dark:text-white font-bold text-xl mb-2">{{ locale.title }}</div>
        <div>{{ locale.subtitle }}</div>
      </div>

      <div class="mb-4">
        <TextField
          v-model:value="state.signInForm.username"
          :label="locale.username"
          required
          :errorMessage="state.signInValdn.username"
          :disabled="state.signInLoading"
          data-testid="username"
        />
      </div>

      <div class="mb-8">
        <TextField
          v-model:value="state.signInForm.password"
          :label="locale.password"
          type="password"
          required
          :errorMessage="state.signInValdn.password"
          :disabled="state.signInLoading"
          data-testid="password"
        />
      </div>

      <Button
        :disabled="state.signInLoading"
        class="w-full mb-4"
        data-testid="sign-in"
        @click="schema.validate() && actions.signIn()"
      >
        <Spinner v-if="state.signInLoading" class="w-5 h-5 align-middle" />
        <div v-else>{{ locale.signIn }}</div>
      </Button>

      <div class="text-center">
        <Link to="/forgot-password">{{ locale.forgotPassword }}</Link>
      </div>
    </form>

    <form v-else class="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8">
      <div class="mb-8">
        <div class="text-slate-900 dark:text-white font-bold text-xl mb-2">
          {{ locale.mfaTitle }}
        </div>
        <div>{{ locale.mfaSubtitle }}</div>
      </div>

      <div class="mb-6 space-y-2">
        <div>{{ locale.mfaHint }}</div>

        <TextField
          v-model:value="state.mfaAuthCode"
          maxlength="6"
          class="text-center"
          data-testid="code"
          @input="actions.inputCode"
        />
      </div>

      <div class="text-center">
        <Link
          to="/sign-in"
          class="flex justify-center"
          @click="
            state.signInLoading = false;
            state.otpEnabled = false;
          "
        >
          <div class="i-ic-round-arrow-back w-5 h-5"></div>
          <div>{{ locale.backToSignIn }}</div>
        </Link>
      </div>
    </form>
  </div>
</template>
