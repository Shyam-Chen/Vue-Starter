<script lang="ts" setup>
import { reactive } from 'vue';

import logo from '~/assets/logo.png';
import TextField from '~/components/TextField.vue';

import listOfLinks from './_list-of-links';
import NavLink from './NavLink.vue';
// import TextField from '~/components/TextField.vue';
// import Dropdown from '~/components/Dropdown.vue';

// const { role, displayName } = JSON.parse(sessionStorage.getItem('user'));

const flux = reactive({
  listOfLinks,
  // selectDropdown(option) {
  //   if (option === '登出') {
  //     sessionStorage.removeItem('token');
  //     sessionStorage.removeItem('user');
  //     navigateTo('/sign-in');
  //   }
  // },
});
</script>

<template>
  <div>
    <header class="navbar px-6 py-4 flex items-center bg-blue-600 shadow-lg">
      <img :src="logo" class="h-12 mr-6" />

      <TextField placeholder="Search here..." />

      <!-- <div class="i-fa-language w-5 h-5"></div> -->

      <select v-model="$i18n.locale">
        <option
          v-for="(lang, idx) in ['en-US', 'ja-JP', 'ko-KR', 'zh-TW']"
          :key="idx"
          :value="lang"
        >
          {{ lang }}
        </option>
      </select>

      <!-- <Dropdown :display="displayName" :options="['變更密碼', '登出']" @select="flux.selectDropdown" /> -->
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

    <main class="page container mx-auto">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  // box-shadow: 0px 1px 2px rgba(0, 255, 255, 0.5), 0px 2px 4px rgba(0, 255, 255, 0.5),
  //   0px 4px 8px rgba(0, 255, 255, 0.5), 0px 8px 16px rgba(0, 255, 255, 0.5);
}

.sidebar {
  position: fixed;
  top: 5rem;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 16rem;
  overflow-y: auto;
  // border-right: 1px solid #eaecef;
  // box-shadow: 10px 0px 15px -5px rgba(184, 185, 190, 0.4);
}

.page {
  padding: 7rem 2rem 2rem 18rem;
}
</style>
