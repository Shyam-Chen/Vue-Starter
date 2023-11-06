<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
import TextField from '~/components/TextField.vue';
import Button from '~/components/Button.vue';

import { useCounter } from './store';

const { state, getters, actions, $reset, $subscribe } = useCounter();

$subscribe((state) => {
  console.log(state);
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Counter' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Counter</div>
  </div>

  <div class="flex flex-col gap-1 my-4">
    <TextField v-model:value="state.name" label="Name" />
    <div>Name: {{ state.name }}</div>

    <div>
      Count: {{ state.count }}<br />
      Doubled: {{ getters.doubleCount }}
    </div>

    <div class="flex gap-2">
      <Button @click="actions.increment">Increment</Button>
      <Button @click="$reset">Reset</Button>
    </div>
  </div>
</template>
