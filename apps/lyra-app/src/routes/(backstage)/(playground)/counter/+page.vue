<script lang="ts" setup>
import { XBreadcrumb, XTextField, XButton } from '@lyra/ui';

import { useCounter } from './store';

const { state, getters, actions, $reset, $subscribe } = useCounter();

$subscribe((state) => {
  console.log(state);
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Counter' }]" />

  <h1 class="text-4xl font-extrabold my-4">Counter</h1>

  <div class="flex flex-col gap-1 my-4">
    <XTextField v-model:value="state.name" label="Name" />
    <div>Name: {{ state.name }}</div>

    <div>
      Count: {{ state.count }}<br />
      Doubled: {{ getters.doubleCount }}
    </div>

    <div class="flex gap-2">
      <XButton @click="actions.increment">Increment</XButton>
      <XButton @click="$reset">Reset</XButton>
    </div>
  </div>
</template>
