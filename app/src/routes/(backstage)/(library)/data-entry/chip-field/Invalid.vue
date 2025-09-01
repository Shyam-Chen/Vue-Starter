<script lang="ts" setup>
import { XCheckbox, XChipField, XDivider } from '@x/ui';
import { ref } from 'vue';

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
