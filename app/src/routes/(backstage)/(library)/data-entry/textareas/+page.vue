<script lang="ts" setup>
import { XBreadcrumb, XCard, XTextarea } from '@x/ui';
import { reactive } from 'vue';

const flux = reactive({
  textarea1: '',
  textarea2: `Curabitur at sapien quis augue accumsan ultrices in non ipsum.\nNam pharetra tortor nec orci aliquam ornare.\nFusce quis nulla tempor, dapibus ligula at, posuere elit.\nFusce consequat odio id pretium ornare.\nMauris quis massa finibus odio auctor pulvinar.`,
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Textarea' }]" />

  <h1 class="text-4xl font-extrabold my-4">Textarea</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTextarea v-model:value="flux.textarea1" label="Example label" placeholder="Type here..." />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Required</h2>

    <XCard>
      <XTextarea
        v-model:value="flux.textarea2"
        label="Example label"
        placeholder="Type here..."
        required
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XTextarea
        v-model:value="flux.textarea2"
        label="Example label"
        placeholder="Type here..."
        required
        invalid
      />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Error Message</h3>

      <XCard>
        <XTextarea
          v-model:value="flux.textarea2"
          label="Example label"
          placeholder="Type here..."
          required
          invalid="Incorrect entry"
        />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h3 class="text-3xl font-bold my-4 pt-6">Disabled</h3>

    <XCard>
      <XTextarea
        v-model:value="flux.textarea2"
        label="Example label"
        placeholder="Type here..."
        disabled
      />
    </XCard>
  </section>

  <section class="my-8">
    <h3 class="text-3xl font-bold my-4 pt-6">Read-only</h3>

    <XCard>
      <XTextarea
        v-model:value="flux.textarea2"
        label="Example label"
        placeholder="Type here..."
        readonly
      />
    </XCard>
  </section>

  <section class="my-8">
    <h3 class="text-3xl font-bold my-4 pt-6">View-only</h3>

    <XCard>
      <XTextarea v-model:value="flux.textarea2" label="Example label" viewonly />
    </XCard>
  </section>
</template>
