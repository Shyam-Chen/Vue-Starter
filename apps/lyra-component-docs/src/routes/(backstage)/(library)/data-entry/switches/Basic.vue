<script lang="ts" setup>
import { ref } from 'vue';
import { XSwitch } from '@lyra/ui';

const checked = ref(false);
</script>

<template>
  <XSwitch v-model:value="checked">Switch</XSwitch>
</template>
