<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'General', disabled: true },
      { text: 'Buttons', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Buttons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex space-x-2 justify-center">
      <Button>Button</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colors</div>

    <div class="flex space-x-2 justify-center">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Outline</div>

    <div class="flex space-x-2 justify-center">
      <Button outline color="primary">Primary</Button>
      <Button outline color="secondary">Secondary</Button>
      <Button outline color="success">Success</Button>
      <Button outline color="danger">Danger</Button>
      <Button outline color="warning">Warning</Button>
      <Button outline color="info">Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rounded</div>

    <div class="flex space-x-2 justify-center">
      <Button rounded color="primary">Primary</Button>
      <Button rounded color="secondary">Secondary</Button>
      <Button rounded color="success">Success</Button>
      <Button rounded color="danger">Danger</Button>
      <Button rounded color="warning">Warning</Button>
      <Button rounded color="info">Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rounded outline</div>

    <div class="flex space-x-2 justify-center">
      <Button outline rounded color="primary">Primary</Button>
      <Button outline rounded color="secondary">Secondary</Button>
      <Button outline rounded color="success">Success</Button>
      <Button outline rounded color="danger">Danger</Button>
      <Button outline rounded color="warning">Warning</Button>
      <Button outline rounded color="info">Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Floating</div>

    <div class="flex space-x-2 justify-center">
      <Button floating color="primary" icon="i-fa-download" />
      <Button floating color="secondary" icon="i-fa-share-square-o" />
      <Button floating color="success" icon="i-fa-plus" />
      <Button floating color="danger" icon="i-fa-minus" />
      <Button floating color="warning" icon="i-fa-exclamation" />
      <Button floating color="info" icon="i-fa-question" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled state</div>

    <div class="flex space-x-2 justify-center">
      <Button color="primary" disabled>Primary</Button>
      <Button color="secondary" disabled>Secondary</Button>
      <Button color="success" disabled>Success</Button>
      <Button color="danger" disabled>Danger</Button>
      <Button color="warning" disabled>Warning</Button>
      <Button color="info" disabled>Info</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">With icon</div>

    <div class="flex space-x-2 justify-center">
      <Button color="primary" icon="i-fa-download">Download</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Block buttons</div>

    <div>
      <Button color="primary" class="w-full mb-2">Button</Button>
      <Button outline color="primary" class="w-full">Button</Button>
    </div>
  </div>
</template>
