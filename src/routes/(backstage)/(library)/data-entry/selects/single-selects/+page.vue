<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Select from '~/components/Select.vue';

const flux = reactive({
  select1: '',
  select1Options: [
    { label: 'Angular', value: 'f1' },
    { label: 'React', value: 'f2' },
    { label: 'Svelte', value: 'f3' },
    { label: 'Vue', value: 'f4' },
    { label: 'Nest', value: 'b1' },
    { label: 'Express', value: 'b2' },
    { label: 'Fastify', value: 'b3' },
    { label: 'Koa', value: 'b4' },
  ],

  cascader1: '',
  cascader1Options: [
    { label: 'HTML5', value: 'html5' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Deno', value: 'deno' },
  ],
  changeCascader1() {
    flux.cascader2 = '';

    if (!flux.cascader1) {
      flux.cascader2Options = [];
    } else if (flux.cascader1 === 'html5') {
      flux.cascader2Options = [
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Solid', value: 'solid' },
      ];
    } else if (flux.cascader1 === 'nodejs') {
      flux.cascader2Options = [
        { label: 'Fastify', value: 'fastify' },
        { label: 'Express', value: 'express' },
        { label: 'Nest', value: 'nest' },
      ];
    } else if (flux.cascader1 === 'deno') {
      flux.cascader2Options = [
        { label: 'Hono', value: 'hono' },
        { label: 'Oak', value: 'oak' },
        { label: 'Alosaur', value: 'alosaur' },
      ];
    }
  },
  cascader2: '',
  cascader2Options: [] as any[],
  changeCascader2() {
    flux.cascader3 = '';
  },
  cascader3: '',
  cascader3Options: [
    { label: 'MongoDB', value: 'mongodb' },
    { label: 'Redis', value: 'redis' },
    { label: 'PostgreSQL', value: 'postgresql' },
  ],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Selects' },
      { text: 'Single selects' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Single selects</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Clearable</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" clearable />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Filterable</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" filterable />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" :errorMessage="'Error'" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Loading</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" loading />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Option Groups (TODO)</div>

    <div class="flex justify-center">
      <!--  -->
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Cascader</div>

    <div class="grid grid-cols-3 gap-4">
      <div>
        <div class="text-sm font-bold mb-2">Platform</div>
        <Select
          v-model:value="flux.cascader1"
          :options="flux.cascader1Options"
          clearable
          @change="flux.changeCascader1"
        />
      </div>

      <div>
        <div class="text-sm font-bold mb-2">Framework</div>
        <Select
          v-model:value="flux.cascader2"
          :options="flux.cascader2Options"
          clearable
          :disabled="!flux.cascader1"
          @change="flux.changeCascader2"
        />
      </div>

      <div>
        <div class="text-sm font-bold mb-2">Database</div>
        <Select
          v-model:value="flux.cascader3"
          :options="flux.cascader3Options"
          clearable
          :disabled="!flux.cascader1 || !flux.cascader2 || flux.cascader1 === 'html5'"
        />
      </div>
    </div>
  </div>
</template>
