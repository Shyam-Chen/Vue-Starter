<script lang="ts" setup>
import { XAlert, XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Alert' }]" />

  <h1 class="text-4xl font-extrabold my-4">Alert</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="space-y-4">
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
          libero. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
          Morbi nec metus.
        </XAlert>
      </div>
    </XCard>
  </section>
</template>
