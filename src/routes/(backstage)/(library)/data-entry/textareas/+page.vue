<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XTextarea } from '@x/ui';

const flux = reactive({
  textarea1: '',
  textarea2: `Curabitur at sapien quis augue accumsan ultrices in non ipsum.\nNam pharetra tortor nec orci aliquam ornare.\nFusce quis nulla tempor, dapibus ligula at, posuere elit.\nFusce consequat odio id pretium ornare.\nMauris quis massa finibus odio auctor pulvinar.`,
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Textarea' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Textarea</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4">Basic</div>

    <XTextarea v-model:value="flux.textarea1" label="Example label" placeholder="Type here..." />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Required</div>

    <XTextarea
      v-model:value="flux.textarea2"
      label="Example label"
      placeholder="Type here..."
      required
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Invalid</div>

    <XTextarea
      v-model:value="flux.textarea2"
      label="Example label"
      placeholder="Type here..."
      required
      invalid
    />

    <div class="my-4">
      <div class="text-2xl font-semibold my-4 pt-5">Error Message</div>

      <XTextarea
        v-model:value="flux.textarea2"
        label="Example label"
        placeholder="Type here..."
        required
        invalid="Incorrect entry"
      />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Disabled</div>

    <XTextarea
      v-model:value="flux.textarea2"
      label="Example label"
      placeholder="Type here..."
      disabled
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Read Only</div>

    <XTextarea v-model:value="flux.textarea2" label="Example label" readonly />
  </div>
</template>
