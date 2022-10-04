<template>
  <div class="checkbox">
    <div class="checkbox-input-wrapper">
      <input :id="`checkbox-${uid}`" v-model="checkboxValue" v-bind="$attrs" type="checkbox" :disabled="disabled" class="checkbox-input">

      <label :for="`checkbox-${uid}`" class="checkbox-label ml-2 mb-0">
        <slot />
      </label>
    </div>

    <div v-if="errorMessage" class="text-danger text-nowrap mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@nuxtjs/composition-api'

let uid = 0

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  setup (props, { emit }) {
    uid += 1

    const checkboxValue = computed({
      get: () => props.value || false,
      set: val => emit('input', val)
    })

    return {
      uid,
      checkboxValue
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  $size: 15px;

  &-input-wrapper {
    position: relative;
    display: flex;
  }

  &-input {
    appearance: none;
    width: $size;
    height: $size;
  }

  &-input::before {
    content: '';
    cursor: pointer;
    display: inline-block;
    visibility: visible;
    position: absolute;
    left: 0;
    top: 6px;
    width: $size;
    height: $size;
    border-radius: 2px;
    background: #e4ebf0;
    box-shadow: inset 2px 2px 3px #c2c8cc, inset -2px -2px 3px #ffffff;
  }

  &-input:checked::after {
    content: '';
    cursor: pointer;
    position: absolute;
    left: 5px;
    top: 8px;
    width: 6px;
    height: 10px;
    border: 1px solid var(--primary);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  &-input:disabled::before {
    cursor: not-allowed;
    background: #c4c4c4;
    box-shadow: inset 2px 2px 3px #a7a7a7, inset -2px -2px 3px #e1e1e1;
  }

  &-input:disabled::after {
    cursor: not-allowed;
    border-color: #c4c4c4 - #555;
  }

  &-label {
    padding: 4px 0 1px;
  }
}
</style>
