<template>
  <button
    v-bind="$attrs"
    type="button"
    class="button"
    :class="{
      primary: primary,
      danger: danger,
      info: info,
      circle: type === 'circle'
    }"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  emits: [],
  setup (props, { emit }) {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  outline: none;
  border-radius: 2rem;
  border: 0.0625rem solid #d1d9e6;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
  text-align: center;
  vertical-align: middle;
  padding: 0.5rem 1.75rem;
  color: #31344b;
  background-color: #e4ebf0;

  // &:focus {
  //   border: 0.0625rem solid #007bff;
  // }

  &:hover {
    background-color: #e4ebf0 - #111;
  }

  &:active:not(:disabled) {
    background-color: #e6e7ee;
    border-color: #e6e7ee;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
  }

  &:disabled {
    cursor: not-allowed;
    background: #c4c4c4;
    color: #c4c4c4 - #555 !important;
    box-shadow: 2px 2px 3px #c4c4ca, -2px -2px 3px #ffffff;
  }

  &.primary {
    color: var(--primary);
  }

  &.danger {
   color: var(--danger);
  }

  &.info {
    color: var(--info);
  }

  &.circle {
    border-radius: 50%;
    padding: 0;
    width: 20px;
    height: 20px;
    display: block;
    line-height: 20px;
  }
}
</style>
