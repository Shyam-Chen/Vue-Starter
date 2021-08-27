<script setup>
import { computed } from 'vue';
import { useValidator, useValidation } from 'vue-formor';

import { useState, useActions } from './store.js';

const state = useState();
const actions = useActions();

const validator = useValidator();

const validation = useValidation(
  [
    [computed(() => state.signInForm.username), [validator.required]],
    [computed(() => state.signInForm.password), [validator.required]],
  ],
  state.errors,
);

const onSignIn = () => {
  if (validation.validate()) {
    actions.signIn();
  }
};
</script>

<template>
  <form>
    <div class="font-bold">Sign-in Form</div>

    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="state.signInForm.username" type="text" class="border" />
      <div class="text-red-500">{{ state.errors['signInForm.username'] }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="state.signInForm.password" type="password" class="border" />
      <div class="text-red-500">{{ state.errors['signInForm.password'] }}</div>
    </div>

    <div>
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
        @click="onSignIn"
      >
        Sign In
      </button>
    </div>
  </form>
</template>
