<script lang="ts" setup>
import { XBreadcrumb, XAlert } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Alert' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Alert</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div class="mb-2">Basic</div>

    <XAlert color="primary" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of primary
    </XAlert>

    <XAlert color="secondary" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of secondary
    </XAlert>

    <XAlert color="success" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of success
    </XAlert>

    <XAlert color="danger" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of danger
    </XAlert>

    <XAlert color="warning" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of warning
    </XAlert>

    <XAlert color="info" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of info
    </XAlert>

    <XAlert color="info" icon="i-mdi-information">
      Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut varius tincidunt
      libero. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Morbi
      nec metus.
    </XAlert>
  </div>
</template>
