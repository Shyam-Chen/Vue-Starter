<script lang="ts" setup>
defineProps({
  step: {
    type: [Number, String],
    default: 0,
  },
  current: {
    type: [Number, String],
    default: 0,
  },
});
</script>

<template>
  <li
    class="stepper-step"
    :class="{
      'text-green-500': Number(step) < Number(current),
      'text-blue-600': Number(step) === Number(current),
      'text-gray-500': Number(step) > Number(current),
    }"
  >
    <div class="w-12 h-6 mb-4 flex justify-center items-center bg-white z-2">
      <div v-if="Number(step) < Number(current)" class="i-fa-regular-check-circle w-6 h-6"></div>
      <div
        v-if="Number(step) === Number(current)"
        class="i-mdi-dots-horizontal-circle-outline w-5 h-5"
      ></div>
      <div v-if="Number(step) > Number(current)" class="i-fa-regular-circle w-3 h-3"></div>
    </div>

    <span><slot></slot></span>
  </li>
</template>

<style lang="scss" scoped>
.stepper-step {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: 10px;

  &:not(:last-of-type)::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    border: 1px solid #ccc;
    transform: translate(50%, 11px);
    z-index: 1;
  }
}
</style>
