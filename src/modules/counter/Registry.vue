<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';

import { useCounter } from './store';

const { state, getters, actions, $reset, $subscribe } = useCounter();

$subscribe((state) => {
  console.log(state);
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Playground', disabled: true },
      { text: 'Counter', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Counter</div>
  </div>

  <div class="">
    <TextField v-model:value="state.name" />
    <div>{{ state.name }}</div>

    <div>{{ state.count }}</div>
    <div>{{ getters.doubleCount }}</div>
    <Button @click="actions.increment">Increment</Button>
    <Button @click="$reset">Reset</Button>
  </div>
</template>
