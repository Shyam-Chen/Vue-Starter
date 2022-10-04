<template>
  <div class="textarea d-flex">
    <label class="textarea-label"><slot /></label>
    <textarea v-model="textFieldValue" v-bind="$attrs" :rows="rows" class="textarea-input" />

    <div v-if="errorMessage" class="textarea-error-message alert alert-danger">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    rows: {
      type: String,
      default: '3'
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  setup (props, { emit }) {
    const textFieldValue = computed({
      get: () => props.value || '',
      set: val => emit('input', val)
    })

    return {
      textFieldValue
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea {
  &-label {
    margin: 0 0.5rem 0 0;
  }

  &-input {
    border-radius: 2px;
    background: #e4ebf0;
    box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    border: 0.0625rem solid #d1d9e6;
    padding: 0 0.75rem;
    outline: none;
    resize: none;

    &:focus {
      border: 0.0625rem solid #007bff;
    }

    &:disabled {
      cursor: not-allowed;
      color: #c4c4c4 - #555;
      background: #c4c4c4;
      box-shadow: inset 3px 3px 6px #a7a7a7, inset -3px -3px 6px #e1e1e1;
    }
  }

  &-error-message {
    position: absolute;
    top: 3rem;
    z-index: 3;
    padding: 0.25rem 0.5rem;
  }
}
</style>
