<script lang="ts" setup>
import { reactive } from 'vue';
import { useStepper } from '@vueuse/core';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Stepper from '~/components/Stepper.vue';
import Button from '~/components/Button.vue';

const flux = reactive({
  stepper1: 3,
});

const stepper = useStepper({
  s1: { title: '1. Enter details' },
  s2: { title: '2. Additional details' },
  s3: { title: '3. Review & pay' },
  s4: { title: '4. Print your label' },
  s5: { title: '5. Next steps' },
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Steppers', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Steppers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <Stepper v-model="flux.stepper1">
      <template #header>
        <Stepper.Step step="1" :current="flux.stepper1">1. Enter details</Stepper.Step>
        <Stepper.Step step="2" :current="flux.stepper1">2. Additional details</Stepper.Step>
        <Stepper.Step step="3" :current="flux.stepper1">3. Review &amp; pay</Stepper.Step>
        <Stepper.Step step="4" :current="flux.stepper1">4. Print your label</Stepper.Step>
        <Stepper.Step step="5" :current="flux.stepper1">5. Next steps</Stepper.Step>
      </template>

      <template #items>
        <Stepper.Content>Content 3</Stepper.Content>
      </template>
    </Stepper>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">
      With
      <code class="text-sm text-gray-800 bg-gray-300 rounded p-1">useStepper</code>
    </div>

    <Stepper>
      <template #header>
        <Stepper.Step
          v-for="(step, key, idx) in stepper.steps.value"
          :key="key"
          :step="idx"
          :current="stepper.index.value"
        >
          {{ step.title }}
        </Stepper.Step>
      </template>

      <template #items>
        <Stepper.Content v-if="stepper.isCurrent('s1')">
          <div class="mb-4">Content 1</div>
          <Button @click="stepper.goToNext">Next</Button>
        </Stepper.Content>

        <Stepper.Content v-if="stepper.isCurrent('s2')">
          <div class="mb-4">Content 2</div>
          <Button color="secondary" @click="stepper.goToPrevious">Back</Button>
          <Button class="ml-2" @click="stepper.goToNext">Next</Button>
        </Stepper.Content>

        <Stepper.Content v-if="stepper.isCurrent('s3')">
          <div class="mb-4">Content 3</div>
          <Button color="secondary" @click="stepper.goToPrevious">Back</Button>
          <Button class="ml-2" @click="stepper.goToNext">Next</Button>
        </Stepper.Content>

        <Stepper.Content v-if="stepper.isCurrent('s4')">
          <div class="mb-4">Content 4</div>
          <Button color="secondary" @click="stepper.goToPrevious">Back</Button>
          <Button class="ml-2" @click="stepper.goToNext">Next</Button>
        </Stepper.Content>

        <Stepper.Content v-if="stepper.isCurrent('s5')">
          <div class="mb-4">Content 5</div>
          <Button color="secondary" @click="stepper.goToPrevious">Back</Button>
          <Button class="ml-2">Submit</Button>
        </Stepper.Content>
      </template>
    </Stepper>
  </div>
</template>
