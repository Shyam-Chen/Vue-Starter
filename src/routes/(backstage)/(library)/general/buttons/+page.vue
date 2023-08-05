<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Buttons' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Buttons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div class="mb-2">
      Basic - The `Button` comes with three variants: contained (default), outlined, and text.
    </div>

    <div class="flex space-x-2 justify-center">
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Contained</div>

    <div class="flex space-x-2 justify-center py-4">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">
        <div class="i-fa-trash w-4 h-4"></div>
        Delete
      </Button>
      <Button color="warning">Warning</Button>
      <Button color="info" icon="i-fa-question" />
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success" icon="i-fa-plus" />
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
    </div>

    <div class="flex space-x-2 justify-center py-4">
      <Button color="primary" disabled>Primary</Button>
      <Button color="secondary" disabled>Secondary</Button>
      <Button color="success" disabled>Success</Button>
      <Button color="danger" disabled>Danger</Button>
      <Button color="warning" disabled>Warning</Button>
      <Button color="info" disabled>Info</Button>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <Button color="primary" disabled>Primary</Button>
      <Button color="secondary" disabled>Secondary</Button>
      <Button color="success" disabled>Success</Button>
      <Button color="danger" disabled>Danger</Button>
      <Button color="warning" disabled>Warning</Button>
      <Button color="info" disabled>Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Outlined</div>

    <div class="flex space-x-2 justify-center py-4">
      <Button variant="outlined" color="primary" icon="i-fa-download" />
      <Button variant="outlined" color="secondary">Secondary</Button>
      <Button variant="outlined" color="success">Success</Button>
      <Button variant="outlined" color="danger">Danger</Button>
      <Button variant="outlined" color="warning">Warning</Button>
      <Button variant="outlined" color="info">
        View
        <div class="i-bx-detail w-4 h-4"></div>
      </Button>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <Button variant="outlined" color="primary">Primary</Button>
      <Button variant="outlined" color="secondary">Secondary</Button>
      <Button variant="outlined" color="success">Success</Button>
      <Button variant="outlined" color="danger">Danger</Button>
      <Button variant="outlined" color="warning" icon="i-fa-exclamation" />
      <Button variant="outlined" color="info">Info</Button>
    </div>

    <div class="flex space-x-2 justify-center py-4">
      <Button variant="outlined" color="primary" disabled>Primary</Button>
      <Button variant="outlined" color="secondary" disabled>Secondary</Button>
      <Button variant="outlined" color="success" disabled>Success</Button>
      <Button variant="outlined" color="danger" disabled>Danger</Button>
      <Button variant="outlined" color="warning" disabled>Warning</Button>
      <Button variant="outlined" color="info" disabled>Info</Button>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <Button variant="outlined" color="primary" disabled>Primary</Button>
      <Button variant="outlined" color="secondary" disabled>Secondary</Button>
      <Button variant="outlined" color="success" disabled>Success</Button>
      <Button variant="outlined" color="danger" disabled>Danger</Button>
      <Button variant="outlined" color="warning" disabled>Warning</Button>
      <Button variant="outlined" color="info" disabled>Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Text</div>

    <div class="flex space-x-2 justify-center py-4">
      <Button variant="text" color="primary">Primary</Button>
      <Button variant="text" color="secondary" icon="i-fa-share-square-o" />
      <Button variant="text" color="success">Success</Button>
      <Button variant="text" color="danger">Danger</Button>
      <Button variant="text" color="warning">Warning</Button>
      <Button variant="text" color="info">Info</Button>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <Button variant="text" color="primary">
        Send
        <div class="i-fa-send w-4 h-4"></div>
      </Button>
      <Button variant="text" color="secondary">Secondary</Button>
      <Button variant="text" color="success">Success</Button>
      <Button variant="text" color="danger" icon="i-fa-minus" />
      <Button variant="text" color="warning">Warning</Button>
      <Button variant="text" color="info">Info</Button>
    </div>

    <div class="flex space-x-2 justify-center py-4">
      <Button variant="text" color="primary" disabled>Primary</Button>
      <Button variant="text" color="secondary" disabled>Secondary</Button>
      <Button variant="text" color="success" disabled>Success</Button>
      <Button variant="text" color="danger" disabled>Danger</Button>
      <Button variant="text" color="warning" disabled>Warning</Button>
      <Button variant="text" color="info" disabled>Info</Button>
    </div>

    <div class="flex space-x-2 justify-center bg-white dark:bg-slate-800 rounded-md shadow-md py-4">
      <Button variant="text" color="primary" disabled>Primary</Button>
      <Button variant="text" color="secondary" disabled>Secondary</Button>
      <Button variant="text" color="success" disabled>Success</Button>
      <Button variant="text" color="danger" disabled>Danger</Button>
      <Button variant="text" color="warning" disabled>Warning</Button>
      <Button variant="text" color="info" disabled>Info</Button>
    </div>
  </div>
</template>
