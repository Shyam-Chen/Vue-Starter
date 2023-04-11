<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

import type { ButtonProps } from './types';
import ContainedButton from './ContainedButton.vue';
import OutlinedButton from './OutlinedButton.vue';
import TextButton from './TextButton.vue';

defineProps<
  {
    variant?: 'contained' | 'outlined' | 'text';
  } & ButtonProps &
    ButtonHTMLAttributes
>();
</script>

<template>
  <ContainedButton v-if="variant === 'contained' || !variant" v-bind="$attrs">
    <slot></slot>
  </ContainedButton>

  <OutlinedButton v-if="variant === 'outlined'" v-bind="$attrs">
    <slot></slot>
  </OutlinedButton>

  <TextButton v-if="variant === 'text'" v-bind="$attrs">
    <slot></slot>
  </TextButton>
</template>
