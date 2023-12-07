<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XButton } from '@x/ui';

const buttonGroup = ref(0);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Button' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Button</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4">Basic</div>

    <div class="flex gap-2 my-4">
      <XButton variant="contained" size="small">Contained</XButton>
      <XButton variant="outlined" size="small">Outlined</XButton>
      <XButton variant="text" size="small">Text</XButton>
    </div>

    <div class="flex gap-2 my-4">
      <XButton variant="contained">Contained</XButton>
      <XButton variant="outlined">Outlined</XButton>
      <XButton variant="text">Text</XButton>
    </div>

    <div class="flex gap-2 my-4">
      <XButton variant="contained" size="large">Contained</XButton>
      <XButton variant="outlined" size="large">Outlined</XButton>
      <XButton variant="text" size="large">Text</XButton>
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Button Group</div>

    <XButton.Group>
      <XButton variant="outlined">Years</XButton>
      <XButton variant="outlined">Month</XButton>
      <XButton variant="outlined">Date</XButton>
    </XButton.Group>

    <div class="my-4">
      <div class="text-2xl font-semibold my-4 pt-5">Controlled</div>

      <XButton.Group v-model="buttonGroup">
        <XButton>Years</XButton>
        <XButton>Month</XButton>
        <XButton>Date</XButton>
      </XButton.Group>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Contained</div>

    <div class="flex space-x-2 justify-center py-4">
      <XButton color="primary">Primary</XButton>
      <XButton color="secondary">Secondary</XButton>
      <XButton color="success">Success</XButton>
      <XButton color="danger">
        <div class="i-fa-trash w-4 h-4"></div>
        Delete
      </XButton>
      <XButton color="warning">Warning</XButton>
      <XButton color="info" icon="i-fa-question" />
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <XButton color="primary">Primary</XButton>
      <XButton color="secondary">Secondary</XButton>
      <XButton color="success" icon="i-fa-plus" />
      <XButton color="danger">Danger</XButton>
      <XButton color="warning">Warning</XButton>
      <XButton color="info">Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center py-4">
      <XButton color="primary" disabled>Primary</XButton>
      <XButton color="secondary" disabled>Secondary</XButton>
      <XButton color="success" disabled>Success</XButton>
      <XButton color="danger" disabled>Danger</XButton>
      <XButton color="warning" disabled>Warning</XButton>
      <XButton color="info" disabled>Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <XButton color="primary" disabled>Primary</XButton>
      <XButton color="secondary" disabled>Secondary</XButton>
      <XButton color="success" disabled>Success</XButton>
      <XButton color="danger" disabled>Danger</XButton>
      <XButton color="warning" disabled>Warning</XButton>
      <XButton color="info" disabled>Info</XButton>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Outlined</div>

    <div class="flex space-x-2 justify-center py-4">
      <XButton variant="outlined" color="primary" icon="i-fa-download" />
      <XButton variant="outlined" color="secondary">Secondary</XButton>
      <XButton variant="outlined" color="success">Success</XButton>
      <XButton variant="outlined" color="danger">Danger</XButton>
      <XButton variant="outlined" color="warning">Warning</XButton>
      <XButton variant="outlined" color="info">
        View
        <div class="i-bx-detail w-4 h-4"></div>
      </XButton>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <XButton variant="outlined" color="primary">Primary</XButton>
      <XButton variant="outlined" color="secondary">Secondary</XButton>
      <XButton variant="outlined" color="success">Success</XButton>
      <XButton variant="outlined" color="danger">Danger</XButton>
      <XButton variant="outlined" color="warning" icon="i-fa-exclamation" />
      <XButton variant="outlined" color="info">Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center py-4">
      <XButton variant="outlined" color="primary" disabled>Primary</XButton>
      <XButton variant="outlined" color="secondary" disabled>Secondary</XButton>
      <XButton variant="outlined" color="success" disabled>Success</XButton>
      <XButton variant="outlined" color="danger" disabled>Danger</XButton>
      <XButton variant="outlined" color="warning" disabled>Warning</XButton>
      <XButton variant="outlined" color="info" disabled>Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <XButton variant="outlined" color="primary" disabled>Primary</XButton>
      <XButton variant="outlined" color="secondary" disabled>Secondary</XButton>
      <XButton variant="outlined" color="success" disabled>Success</XButton>
      <XButton variant="outlined" color="danger" disabled>Danger</XButton>
      <XButton variant="outlined" color="warning" disabled>Warning</XButton>
      <XButton variant="outlined" color="info" disabled>Info</XButton>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Text</div>

    <div class="flex space-x-2 justify-center py-4">
      <XButton variant="text" color="primary">Primary</XButton>
      <XButton variant="text" color="secondary" icon="i-fa-share-square-o" />
      <XButton variant="text" color="success">Success</XButton>
      <XButton variant="text" color="danger">Danger</XButton>
      <XButton variant="text" color="warning">Warning</XButton>
      <XButton variant="text" color="info">Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <XButton variant="text" color="primary">
        Send
        <div class="i-fa-send w-4 h-4"></div>
      </XButton>
      <XButton variant="text" color="secondary">Secondary</XButton>
      <XButton variant="text" color="success">Success</XButton>
      <XButton variant="text" color="danger" icon="i-fa-minus" />
      <XButton variant="text" color="warning">Warning</XButton>
      <XButton variant="text" color="info">Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center py-4">
      <XButton variant="text" color="primary" disabled>Primary</XButton>
      <XButton variant="text" color="secondary" disabled>Secondary</XButton>
      <XButton variant="text" color="success" disabled>Success</XButton>
      <XButton variant="text" color="danger" disabled>Danger</XButton>
      <XButton variant="text" color="warning" disabled>Warning</XButton>
      <XButton variant="text" color="info" disabled>Info</XButton>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <XButton variant="text" color="primary" disabled>Primary</XButton>
      <XButton variant="text" color="secondary" disabled>Secondary</XButton>
      <XButton variant="text" color="success" disabled>Success</XButton>
      <XButton variant="text" color="danger" disabled>Danger</XButton>
      <XButton variant="text" color="warning" disabled>Warning</XButton>
      <XButton variant="text" color="info" disabled>Info</XButton>
    </div>
  </div>
</template>
