<template>
  <div class="radio-group d-flex flex-column">
    <div class="d-flex">
      <div v-for="(item, idx) in options" :key="idx" class="radio-group-input-wrapper pr-2">
        <input
          :id="`radio-group-${uid}-${item.label}-${idx}`"
          v-model="radioGroupValue"
          v-bind="$attrs"
          type="radio"
          :name="flux.radioGroupName"
          :value="item.value"
          :disabled="disabled"
          class="radio-group-input"
          @change="$emit('change', radioGroupValue)"
        >

        <label :for="`radio-group-${uid}-${item.label}-${idx}`" class="radio-group-label ml-2 mb-0">
          {{ typeof item === 'object' ? item.label : item }}
        </label>
      </div>
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
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
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

    const radioGroupValue = computed({
      get: () => props.value || '',
      set: val => emit('input', val)
    })

    const flux = reactive({
      radioGroupName: `radioGroup${uid}`
    })

    return {
      uid,
      radioGroupValue,
      flux
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-group {
  $size: 15px;
  margin-top: 2px;

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
    top: 5px;
    width: $size;
    height: $size;
    border-radius: 50%;
    background: #e4ebf0;
    box-shadow: inset 2px 2px 3px #c2c8cc, inset -2px -2px 3px #fff;
  }

  &-input:checked::after {
    content: '';
    cursor: pointer;
    position: absolute;
    left: 4px;
    top: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
  }

  &-input:disabled::before {
    cursor: not-allowed;
    background: #c4c4c4;
    box-shadow: inset 2px 2px 3px #a7a7a7, inset -2px -2px 3px #e1e1e1;
  }

  &-input:disabled::after {
    cursor: not-allowed;
    background: #c4c4c4 - #555;
  }

  &-label {
    padding: 4px 0 1px;
  }
}
</style>
