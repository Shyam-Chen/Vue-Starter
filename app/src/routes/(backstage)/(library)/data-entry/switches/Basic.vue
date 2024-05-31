<script lang="ts" setup>
import { XSwitch } from '@x/ui';
import { ref } from 'vue';

const checked = ref(false);
</script>

<template>
  <XSwitch v-model:value="checked">Switch</XSwitch>
</template>
