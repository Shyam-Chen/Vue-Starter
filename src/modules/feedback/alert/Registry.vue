<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Alert from '~/components/Alert.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Alert', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Alert</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div class="mb-2">Basic</div>

    <Alert color="primary" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of primary
    </Alert>

    <Alert color="secondary" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of secondary
    </Alert>

    <Alert color="success" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of success
    </Alert>

    <Alert color="danger" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of danger
    </Alert>

    <Alert color="warning" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of warning
    </Alert>

    <Alert color="info" icon="i-mdi-information">
      I'm an alert with a <span class="font-bold">color</span> of info
    </Alert>

    <Alert color="info" icon="i-mdi-information">
      Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut varius tincidunt
      libero. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Morbi
      nec metus.
    </Alert>
  </div>
</template>
