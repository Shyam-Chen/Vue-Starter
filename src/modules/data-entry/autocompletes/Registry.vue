<script lang="ts" setup>
import { reactive, watch } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Autocomplete from '~/components/Autocomplete.vue';

const flux = reactive({
  autocomplete: 'sc',

  value: '',
  backspace: false,
  values: ['Vue', 'Fastify', 'TypeScript'],
  onEnter() {
    if (flux.value) {
      flux.values.push(flux.value);
      flux.value = '';
      flux.backspace = true;
    }
  },
  onDelete() {
    if (!flux.value && flux.backspace) {
      flux.values.pop();
    }

    if (!flux.value) {
      flux.backspace = true;
    }
  },
});

watch(
  () => flux.value,
  (val, oldVal) => {
    if (!val && !oldVal) flux.backspace = true;
    if (val) flux.backspace = false;
  },
  { immediate: true },
);
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Autocompletes', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Autocompletes</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Autocomplete v-model:value="flux.autocomplete" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Multiple</div>

    <div class="flex justify-center">
      <div
        class="flex gap-1 bg-white border border-slate-400 rounded w-full px-3 text-slate-700 leading-tight"
        :class="[flux.values.length ? 'py-1.5' : 'py-2']"
      >
        <span
          v-for="value in flux.values"
          :key="value"
          class="flex items-center text-xs rounded-full inline-block whitespace-nowrap text-center bg-blue-600 text-white px-2 py-1"
          >{{ value }}<span class="inline-block i-fa-times-circle w-3 h-3 ml-1"></span
        ></span>

        <input
          v-model="flux.value"
          class="outline-none w-full"
          @keyup.enter="flux.onEnter"
          @keyup.delete="flux.onDelete"
        />
      </div>
    </div>
  </div>
</template>
