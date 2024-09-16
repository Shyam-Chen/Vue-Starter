<script lang="ts" setup>
import { ref } from 'vue';
import { XCheckbox, XChipField, XDivider } from '@x/ui';

const values = ref<string[]>([]);
const invalid = ref(true);
const errorMessage = ref('Incorrect entry');
</script>

<template>
  <XChipField
    v-model:value="values"
    label="Example label"
    placeholder="Type here..."
    required
    :invalid="invalid && errorMessage"
  />
  <XDivider />
  <XCheckbox v-model:value="invalid">invalid</XCheckbox>
</template>
