<script lang="ts" setup>
import { reactive } from 'vue';

import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';

import useStore from './store';
import { useTouchSchema } from './schema';

const { state, actions } = useStore();
const touchSchema = useTouchSchema();

const flux = reactive({
  useError: false,
  submitZodFormWithTouch() {
    flux.useError = true;

    if (touchSchema.validate()) {
      actions.submit();
    }
  },
});

touchSchema.validate();
</script>

<template>
  <div class="grid gap-6 w-full my-4">
    <form class="bg-white dark:bg-slate-800 shadow-md rounded px-8 py-6">
      <div class="text-2xl font-bold mb-4">Zod Form (Touch)</div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <TextField
          v-model:value="state.zodForm.username"
          label="Username"
          required
          useTouch
          :useError="flux.useError"
          :errorMessage="state.touchValdn.username"
        />
        <TextField
          v-model:value="state.zodForm.password"
          label="Password"
          type="password"
          required
          useTouch
          :useError="flux.useError"
          :errorMessage="state.touchValdn.password"
        />
      </div>

      <div class="flex items-center justify-between">
        <Button color="primary" @click="flux.submitZodFormWithTouch">Submit</Button>
      </div>
    </form>
  </div>
</template>
