<template>
  <div>
    <label class="toggle-switch">
      <input v-model="toggleSwitchValue" v-bind="$attrs" type="checkbox" class="toggle-switch-input">
      <span class="toggle-switch-slider" />
    </label>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  setup (props, { emit }) {
    const toggleSwitchValue = computed({
      get: () => props.value || '',
      set: val => emit('input', val)
    })

    return {
      toggleSwitchValue
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-switch {
  $self: &;
  $size: 20px;
  position: relative;
  display: inline-block;
  width: $size * 3 - 4px / 2;
  height: $size;

  &-input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + #{$self}-slider::before {
      background: linear-gradient(145deg, #0084ff, #006fe6);
      transform: translateX($size * 1.5);
    }

    &:disabled + #{$self}-slider {
      cursor: not-allowed;
      color: #c4c4c4 - #555;
      background: #c4c4c4;
      box-shadow: inset 2px 2px 4px #a7a7a7, inset -2px -2px 4px #e1e1e1;
    }

    &:checked:disabled + #{$self}-slider::before {
      background: linear-gradient(145deg, #f4fbff - #555, #cdd4d8 - #555);
    }
  }

  &-slider {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2rem;
    background: #e4ebf0;
    box-shadow: inset 2px 2px 4px #c2c8cc, inset -2px -2px 4px #ffffff;
    transition: all .5s ease;

    &::before {
      content: '';
      position: absolute;
      height: $size;
      width: $size;
      left: 4px;
      bottom: 0;
      border-radius: 50%;
      background: linear-gradient(145deg, #f4fbff, #cdd4d8);
      box-shadow: 2px 2px 4px #c2c8cc, -2px -2px 4px #ffffff;
      transition: .4s;
    }
  }
}
</style>
