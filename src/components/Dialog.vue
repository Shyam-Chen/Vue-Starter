<script setup>

</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-200"
    enter-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="value" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="close">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="absolute top-1 right-1 cursor-pointer" @click="close">
            <svg class="w-6 h-6 fill-current text-gray-400 hover:text-gray-600" viewBox="0 0 24 24">
              <path :d="mdiClose" />
            </svg>
          </div>

          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
