<script setup>
import { reactive } from 'vue';

const state = reactive({
  isMenu: true,
});

function toggleMenu() {
  state.isMenu = !state.isMenu;
}
</script>

<template>
  <header class="bg-white shadow px-3 py-2 md:px-5 md:py-4">
    <div class="flex w-full max-w-6xl my-0 mx-auto justify-between items-center">
      <div class="flex">
        <img src="../../assets/logo.png" alt="Logo" class="w-10 h-10" />

        <div class="text-sm ml-1 flex flex-col justify-between">
          <div class="branded-title uppercase text-gray-500">brandedTitle</div>
          <div class="branded-headline text-2xl text-gray-700 font-bold">lang.brandedHeadline</div>
        </div>
      </div>

      <div class="relative inline-block text-left md:hidden">
        <div>
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-full px-1 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="menu"
            aria-haspopup="true"
            aria-expanded="true"
            @click="toggleMenu"
          >
            <img
              src="https://api.iconify.design/ic:round-more-vert.svg?height=24"
              alt="More"
              class="w-6 h-6"
            />
          </button>
        </div>

        <transition
          enter-active-class="transition duration-100"
          leave-active-class="transition duration-75"
          enter-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-show="state.isMenu"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >Link</a
              >
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >Link</a
              >
            </div>
          </div>
        </transition>
      </div>

      <div class="hidden md:block divide-x divide-gray-300 text-gray-600">
        <a href="" target="_blank" rel="noopener noreferrer" class="py-1 px-3 hover:text-red-500"
          >Link</a
        >
        <a href="" target="_blank" rel="noopener noreferrer" class="py-1 px-3 hover:text-red-500"
          >Link</a
        >
      </div>
    </div>
  </header>
</template>
