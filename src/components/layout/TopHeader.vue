<script setup>
import { reactive } from 'vue';
import { useLocale } from 'vue-localer';

import logo from '~/assets/logo.png';

const locale = useLocale();

const state = reactive({
  isMenu: false,
});

function toggleMenu() {
  state.isMenu = !state.isMenu;
}
</script>

<template>
  <header class="bg-white shadow px-3 py-2 md:px-5 md:py-4">
    <div class="flex w-full max-w-6xl my-0 mx-auto justify-between items-center">
      <router-link class="flex" :to="{ name: 'home' }">
        <img :src="logo" alt="Logo" class="w-10 h-10" />

        <div class="text-sm ml-1 flex flex-col justify-between">
          <div class="branded-headline text-2xl text-gray-700 font-bold">{{ locale.title }}</div>
        </div>
      </router-link>

      <div class="relative inline-block text-left md:hidden">
        <div>
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-full px-1 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
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
              <router-link
                :to="{ name: 'home' }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >Home</router-link
              >
              <router-link
                :to="{ name: 'helloWorld' }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >Hello World</router-link
              >
              <router-link
                :to="{ name: 'counter' }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >Counter</router-link
              >
            </div>
          </div>
        </transition>
      </div>

      <div class="hidden md:flex divide-x divide-gray-300 text-gray-600">
        <router-link :to="{ name: 'home' }" class="px-3 hover:text-green-500">Home</router-link>
        <router-link :to="{ name: 'helloWorld' }" class="px-3 hover:text-green-500"
          >Hello World</router-link
        >
        <router-link :to="{ name: 'counter' }" class="px-3 hover:text-green-500"
          >Counter</router-link
        >
      </div>
    </div>
  </header>
</template>
