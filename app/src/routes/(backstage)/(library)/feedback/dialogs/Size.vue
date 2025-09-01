<script lang="ts" setup>
import { XButton, XDialog } from '@x/ui';
import { ref } from 'vue';

const dialog = ref(false);
</script>

<template>
  <XButton label="Launch" @click="dialog = true" />

  <XDialog v-model="dialog" title="Lorem Ipsum" class="!w-100">
    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
  </XDialog>
</template>
