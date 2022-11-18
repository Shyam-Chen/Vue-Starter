<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useIdle } from '@vueuse/core';

import TextField from '~/components/TextField.vue';
import Dropdown from '~/components/Dropdown.vue';
import Select from '~/components/Select.vue';
import Dialog from '~/components/Dialog.vue';
import Button from '~/components/Button.vue';
import { useFetch } from '~/composables';

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
  idleDialog: false,
  authDialog: false,
});

const { data, statusCode } = useFetch('/auth/user', { timeout: 3000 }).json();

watch(
  () => statusCode.value,
  (val) => {
    if (val && 400 <= val && val <= 500) {
      localStorage.removeItem('token');
      flux.authDialog = true;
    }
  },
);

watch(
  () => flux.authDialog,
  (val) => {
    if (!val) router.push('/sign-in');
  },
);

watch(
  () => idle.value,
  (val) => {
    if (val) {
      localStorage.removeItem('token');
      flux.idleDialog = true;
    }
  },
);

watch(
  () => flux.idleDialog,
  (val) => {
    if (!val) router.push('/sign-in');
  },
);
</script>

<template>
  <div class="h-full">
    <header class="topbar px-6 py-4 flex items-center bg-blue-600 shadow-lg">
      <div class="i-simple-icons-deno w-12 h-12 mr-4 text-white"></div>
      <div class="text-3xl font-bold text-white mr-4">Deno Land</div>

      <div style="flex: 1 0 auto"></div>

      <TextField placeholder="Search here..." prepend="i-fa-search" class="important:w-100" />

      <Dropdown
        :options="['Change Password', 'Sign out']"
        class="ml-6 text-white"
        @select="flux.selectDropdown"
      >
        <div class="text-white">{{ data?.fullName }}</div>
      </Dropdown>
    </header>

    <aside class="sidebar py-4 bg-white shadow-lg">
      <template v-for="link in flux.listOfLinks" :key="link.name">
        <NavLink
          :icon="link.icon"
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

      <footer class="footer bg-slate-200 p-4 flex justify-between">
        <div></div>

        <div class="flex items-center">
          <div class="i-fa-language w-6 h-6 text-gray-700"></div>

          <Select
            v-model:value="$i18n.locale"
            :options="[
              { label: 'English', value: 'en-US' },
              { label: '日本語', value: 'ja-JP' },
              { label: '한국어', value: 'ko-KR' },
              { label: '正體中文', value: 'zh-TW' },
            ]"
            class="w-50 ml-2"
          />
        </div>
      </footer>
    </div>

    <Dialog v-model="flux.idleDialog">
      <div class="text-2xl">Idle Time-out</div>
      <div class="my-2">Please sign-in again.</div>

      <div class="flex justify-end">
        <Button color="primary" @click="flux.idleDialog = false">Okay, got it</Button>
      </div>
    </Dialog>

    <Dialog v-model="flux.authDialog">
      <div class="text-2xl">{{ data?.error }}</div>
      <div class="my-2">{{ data?.message }}</div>

      <div class="flex justify-end">
        <Button color="primary" @click="flux.authDialog = false">Okay, got it</Button>
      </div>
    </Dialog>
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
