<script lang="ts" setup>
import { XAlert } from '@x/ui';
</script>

<template>
  <div class="space-y-4">
    <XAlert color="primary" icon="i-material-symbols-celebration-rounded">
      I'm an alert with a <span class="font-bold">color</span> of primary
    </XAlert>

    <XAlert color="secondary" icon="i-material-symbols-account-circle">
      I'm an alert with a <span class="font-bold">color</span> of secondary
    </XAlert>

    <XAlert color="success" icon="i-material-symbols-check-circle-rounded">
      I'm an alert with a <span class="font-bold">color</span> of success
    </XAlert>

    <XAlert color="danger" icon="i-material-symbols-dangerous-rounded">
      I'm an alert with a <span class="font-bold">color</span> of danger
    </XAlert>

    <XAlert color="warning" icon="i-material-symbols-warning-rounded">
      I'm an alert with a <span class="font-bold">color</span> of warning
    </XAlert>

    <XAlert color="info" icon="i-material-symbols-info-rounded">
      I'm an alert with a <span class="font-bold">color</span> of info
    </XAlert>

    <XAlert color="info" icon="i-material-symbols-info-rounded">
      Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut varius tincidunt
      libero. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Morbi
      nec metus.
    </XAlert>
  </div>
</template>
