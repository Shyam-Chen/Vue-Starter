<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  color: {
    type: String as PropType<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'>,
    default: '',
  },
  outline: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  floating: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <template v-if="floating">
    <button
      v-bind="$attrs"
      type="button"
      class="inline-block rounded-full leading-normal uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
      :class="{
        'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800':
          color === 'primary',
        'bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800':
          color === 'secondary',
        'bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700':
          color === 'success',
        'bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800':
          color === 'danger',
        'bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700':
          color === 'warning',
        'bg-blue-400 text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600':
          color === 'info',
      }"
    >
      <div class="w-3 mx-auto" :class="icon"></div>
    </button>
  </template>

  <template v-else-if="outline">
    <button
      v-bind="$attrs"
      type="button"
      class="inline-block px-6 py-2 bg-white border-2 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      :class="{
        'border-blue-600 text-blue-600': color === 'primary',
        'border-purple-600 text-purple-600': color === 'secondary',
        'border-green-500 text-green-500': color === 'success',
        'border-red-600 text-red-600': color === 'danger',
        'border-yellow-500 text-yellow-500': color === 'warning',
        'border-blue-400 text-blue-400': color === 'info',
        'rounded-full': rounded,
      }"
    >
      <slot></slot>
    </button>
  </template>

  <template v-else>
    <button
      v-bind="$attrs"
      type="button"
      class="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
      :class="{
        'bg-white border hover:bg-slate-100 focus:bg-slate-200 active:bg-slate-300': !color,
        'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800':
          color === 'primary',
        'bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800':
          color === 'secondary',
        'bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700':
          color === 'success',
        'bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800':
          color === 'danger',
        'bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700':
          color === 'warning',
        'bg-blue-400 text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600':
          color === 'info',
        'rounded-full': rounded,
        'pointer-events-none opacity-60': disabled,
        'flex items-center': icon,
      }"
    >
      <div v-if="icon" class="w-3 mr-2" :class="icon"></div>
      <slot></slot>
    </button>
  </template>
</template>
