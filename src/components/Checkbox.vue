<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value']);

const uid = uniqueId('checkbox-');

const checkboxValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="checkbox flex items-center">
    <input
      :id="uid"
      v-model="checkboxValue"
      v-bind="$attrs"
      type="checkbox"
      class="accent-blue-600 border-gray-300 rounded h-4 w-4"
      :class="[$attrs.hasOwnProperty('disabled') ? 'cursor-not-allowed' : 'cursor-pointer']"
    />

    <label :for="uid" class="checkbox-label ml-2">
      <slot />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  &-label:empty {
    display: none;
  }
}
</style>
