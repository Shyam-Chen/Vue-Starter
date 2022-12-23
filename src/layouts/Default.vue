<script lang="ts" setup>
import { reactive, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLocaler, useLocale } from 'vue-localer';
import { useIdle } from '@vueuse/core';

import TextField from '~/components/TextField.vue';
import Dropdown from '~/components/Dropdown.vue';
import Select from '~/components/Select.vue';
import Dialog from '~/components/Dialog.vue';
import Button from '~/components/Button.vue';
import Drawer from '~/components/Drawer.vue';
import { useFetch } from '~/composables';

import listOfLinks from './_includes/list-of-links';
import NavLink from './_includes/NavLink.vue';

const router = useRouter();
const route = useRoute();
const localer = useLocaler();
const locale = useLocale();
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
  changeLang(val: string) {
    localStorage.setItem('language', val);
  },

  navDrawer: false,
});

const { data, statusCode, execute } = useFetch('/auth/user', { timeout: 3000 }).json();

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

watch(
  () => route.path,
  () => {
    if (flux.navDrawer) flux.navDrawer = false;
  },
);

onMounted(() => {
  execute();
});
</script>

<template>
  <div class="h-full">
    <header class="topbar px-6 py-4 flex items-center bg-blue-600 shadow-lg">
      <div
        class="i-ic-round-menu w-8 h-8 mr-4 text-white cursor-pointer transition hover:scale-125 xl:hidden"
        @click="flux.navDrawer = true"
      ></div>

      <div class="i-simple-icons-deno w-12 h-12 mr-4 text-white"></div>
      <div class="text-3xl font-bold text-white mr-4">{{ locale.title }}</div>

      <div style="flex: 1 0 auto"></div>

      <TextField placeholder="Search here..." prepend="i-fa-search" class="important:w-100" />

      <Dropdown
        :options="['Change Password', 'Sign out']"
        class="ml-6 text-white"
        @select="flux.selectDropdown"
      >
        <div class="text-white">{{ data?.fullName }}</div>
        <div class="i-mdi-chevron-down w-5 h-5 text-inherit"></div>
      </Dropdown>
    </header>

    <aside class="sidebar py-4 bg-white shadow-lg hidden xl:block">
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
        <div>
          <div class="font-bold">Backstage Management System</div>
          <div>Design for desktop displays from 1024x768 through 1920x1080</div>
        </div>

        <div></div>

        <div class="flex items-center">
          <div class="i-fa-language w-6 h-6 text-gray-700"></div>

          <Select
            v-model:value="localer.lang.value"
            :options="[
              { label: 'English', value: 'en-US' },
              { label: '日本語', value: 'ja-JP' },
              { label: '한국어', value: 'ko-KR' },
              { label: '正體中文', value: 'zh-TW' },
            ]"
            class="w-50 ml-2"
            @change="flux.changeLang"
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

    <Drawer v-model="flux.navDrawer">
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
    </Drawer>
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
  padding: ($topbar-height + 2rem) 2rem 2rem;

  @media (min-width: 1280px) {
    padding: ($topbar-height + 2rem) 2rem 2rem ($sidebar-width + 2rem);
  }
}

.footer {
  padding: 2rem;

  @media (min-width: 1280px) {
    padding: 2rem 2rem 2rem ($sidebar-width + 2rem);
  }
}
</style>
