<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useIdle } from '@vueuse/core';

import TextField from '~/components/TextField.vue';
import Dropdown from '~/components/Dropdown.vue';

import listOfLinks from './list-of-links';
import NavLink from './NavLink.vue';

const router = useRouter();
const { idle } = useIdle(30 * 60 * 1000);

const flux = reactive({
  listOfLinks,
  selectDropdown(option: string) {
    if (option === 'Sign out') {
      localStorage.removeItem('token');
      router.push('/sign-in');
    }
  },
});

watch(
  () => idle.value,
  (val) => {
    if (val) {
      localStorage.removeItem('token');
      console.log('Idle Timeout');
      console.log('Please sign in again');
      console.log('Okay');
      alert('Idle Timeout');
    }
  },
);
</script>

<template>
  <div class="h-full">
    <header class="topbar px-6 py-4 flex items-center bg-blue-600 shadow-lg">
      <div class="i-simple-icons-deno w-12 h-12 mr-4 text-white"></div>
      <div class="text-3xl font-bold text-white mr-4">Deno Land</div>

      <div style="flex: 1 0 auto"></div>

      <TextField placeholder="Search here..." class="important:w-100" />

      <Dropdown :options="['Change Password', 'Sign out']" @select="flux.selectDropdown">
        <div class="text-white">{{ 'Rich Harris' }}</div>
      </Dropdown>
    </header>

    <aside class="sidebar py-4 bg-white shadow-lg">
      <template v-for="link in flux.listOfLinks" :key="link.name">
        <NavLink
          :name="link.name"
          :to="link.to"
          :permissions="link.permissions"
          :sub="link.sub"
          firstLevelStatus
        />
      </template>
    </aside>

    <div class="flex flex-col h-full">
      <main class="page container w-full self-center">
        <slot></slot>
      </main>

      <div style="flex: 1 0 auto"></div>

      <footer class="footer bg-gray-200 p-4">
        <div class="i-fa-language w-6 h-6 text-gray-700"></div>

        <select v-model="$i18n.locale">
          <option v-for="(lang, idx) in $i18n.availableLocales" :key="idx" :value="lang">
            {{ lang }}
          </option>
        </select>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$topbar-height: 5rem;
$sidebar-width: 16rem;

.topbar {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
}

.sidebar {
  position: fixed;
  top: 5rem;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: $sidebar-width;
  overflow-y: auto;
}

.page {
  padding: ($topbar-height + 2rem) 2rem 2rem ($sidebar-width + 2rem);
}

.footer {
  padding: 2rem 2rem 2rem ($sidebar-width + 2rem);
}
</style>
