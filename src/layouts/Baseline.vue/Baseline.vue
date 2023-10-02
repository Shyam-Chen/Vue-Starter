<script lang="ts" setup>
import { reactive, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLocaler } from 'vue-localer';
import { useDark, useToggle, useTextDirection } from '@vueuse/core';

import TextField from '~/components/TextField.vue';
import Dropdown from '~/components/Dropdown.vue';
import Select from '~/components/Select.vue';
import Dialog from '~/components/Dialog.vue';
import Button from '~/components/Button.vue';
import Drawer from '~/components/Drawer.vue';
import Spinner from '~/components/Spinner.vue';
import request from '~/utilities/request';

import type { Link } from './links-list';
import NavLink from './NavLink.vue';
import IdleDialog from './IdleDialog.vue';
import useStore from './store';

const router = useRouter();
const route = useRoute();
const localer = useLocaler();

const isDark = useDark();
const toggleDark = useToggle(isDark);
const textDirection = useTextDirection();

const { state } = useStore();

const flux = reactive({
  user: {} as any,
  userError: {} as any,
  userLoading: true,

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/sign-in');
  },
  authDialog: false,
  changeLang(val: string) {
    localStorage.setItem('language', val);
  },
  searchDialog: false,

  navDrawer: false,

  avatar(fullName: string) {
    const arr = fullName?.split(' ');
    if (arr?.length > 1) return arr[0][0] + arr[1][0];
    return arr?.[0][0];
  },
});

watch(
  () => flux.authDialog,
  (val) => {
    if (!val) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/sign-in');
    }
  },
);

watch(
  () => route.path,
  () => {
    if (flux.navDrawer) flux.navDrawer = false;
  },
);

function setStatus(link: Link, sub: Link['sub'], parentLink?: Link) {
  if (sub?.length) {
    sub.forEach((subLink) => {
      if (subLink.to === route.path) {
        if (parentLink) parentLink.status = true;
        link.status = true;
      } else if (subLink.to && route.path.startsWith(subLink.to)) {
        if (parentLink) parentLink.status = true;
        link.status = true;
      }

      if (subLink.sub?.length) {
        setStatus(subLink, subLink.sub, link);
      }
    });
  }
}

state.listOfLinks.forEach((link) => {
  setStatus(link, link.sub);
});

onMounted(async () => {
  const response = await request('/auth/user', { method: 'GET' });

  flux.userLoading = false;

  if (response.status === 200) {
    flux.user = response._data;
  }

  if (400 <= response.status && response.status <= 500) {
    flux.authDialog = true;
    flux.userError = response._data;
  }
});
</script>

<template>
  <div class="h-full">
    <header class="topbar px-6 py-4 flex items-center gap-4 shadow-lg">
      <div
        class="i-ic-round-menu w-8 h-8 text-white cursor-pointer transition hover:scale-125 xl:hidden"
        @click="flux.navDrawer = true"
      ></div>

      <svg
        width="192"
        height="40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192 40"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M52.7 25.24c-.31-.07-.56-.15-.8-.25-.16-.08-.3-.16-.42-.27a.32.32 0 01-.11-.28c.12-1.27-.01-2.4.1-3.65.51-5.12 3.73-3.5 6.62-4.33 1.65-.47 3.31-1.39 3.92-3.2.1-.3.01-.62-.2-.85a37.06 37.06 0 00-6.26-5.68A37.5 37.5 0 0028.93.37a.47.47 0 00-.34.72A14.02 14.02 0 0033 5.43c.32.2.19.63-.18.54a8.39 8.39 0 01-2.98-1.3.36.36 0 00-.34-.03l-1.69.68a.46.46 0 00-.12.78 14 14 0 0016.43 1.39c.32-.2.83.2.73.56-.17.57-.36 1.36-.56 2.43-1.3 6.53-5.02 6.03-9.63 4.38-9.2-3.34-14.43-.49-19.07-6.13-.33-.4-.9-.53-1.28-.2a4.36 4.36 0 00.44 6.97c.15.1.34.06.45-.07.29-.37.52-.6.82-.76.31-.16.47.3.2.53-.99.87-1.27 1.91-1.91 3.97-1.02 3.21-.59 6.5-5.32 7.36-2.5.13-2.46 1.83-3.37 4.36-1.06 3.06-2.44 4.4-5 7.08-.36.36-.39.95 0 1.28 1.02.87 2.08.92 3.15.48 2.66-1.12 4.71-4.56 6.64-6.79 2.15-2.48 7.31-1.42 11.21-3.85 2.1-1.29 3.37-2.94 2.97-5.4-.07-.4.39-.64.55-.27.31.7.52 1.44.6 2.2.03.21.2.36.41.35 4.22-.24 9.67 4.41 14.77 5.67.31.08.53-.28.36-.55a9.41 9.41 0 01-1.33-3.1c-.1-.39.48-.5.68-.14a9.42 9.42 0 007.56 4.84c1.24.1 2.6-.05 4.02-.48 1.7-.51 3.27-1.17 5.14-.81a5.3 5.3 0 013.5 2.15c1.13 1.66 3.53 2.1 4.81.36a.83.83 0 00.08-.82c-2.82-6.6-9.97-7.05-13.05-7.85z"
          fill="#fff"
        ></path>
        <path
          d="M91.63 10.79a1 1 0 01.9-.82l3.42-.3a.4.4 0 01.43.48L92.94 29.3a1 1 0 01-.98.82h-2.59c-.23 0-.4-.2-.37-.44.06-.35-.37-.6-.67-.39-1.13.8-2.39 1.2-3.75 1.2a6.1 6.1 0 01-4.7-2.04A7.06 7.06 0 0178 23.49c0-2.5.77-4.58 2.31-6.24a7.69 7.69 0 015.9-2.49c1.43 0 2.64.38 3.63 1.13.33.25.85.1.92-.31l.87-4.8zm-5.8 15.8a3.7 3.7 0 002.9-1.26 4.54 4.54 0 001.1-3.1c0-1.06-.3-1.92-.9-2.57a3.02 3.02 0 00-2.35-.99c-1.18 0-2.13.42-2.87 1.26a4.47 4.47 0 00-1.11 3.1c0 1.05.3 1.9.9 2.57a3 3 0 002.34.98zM101.43 12.73c-.7 0-1.3-.25-1.8-.73a2.4 2.4 0 01-.75-1.8c0-.88.33-1.64.98-2.26.64-.63 1.4-.94 2.3-.94.69 0 1.28.25 1.78.76.5.52.74 1.12.74 1.79 0 .88-.32 1.62-.96 2.24-.64.63-1.4.94-2.29.94zm-.48 16.58a1 1 0 01-.98.82h-2.59a1 1 0 01-.98-1.18l2.33-13a1 1 0 01.99-.82h2.6a1 1 0 01.98 1.18l-2.35 13zM117.14 15.2c.11.05.2.14.25.25.05.12.04.26-.01.38L116 18.8a.5.5 0 01-.22.24.55.55 0 01-.49 0c-.47-.23-1-.33-1.56-.32-1.23 0-2.17.5-2.84 1.5-.24.38-.5 1.27-.79 2.66l-1.12 6.41a1 1 0 01-.98.83h-2.6a1 1 0 01-1-1.18l2.34-13a1 1 0 01.99-.82h2.2c.42 0 .74.37.67.78-.06.35.4.57.67.34a5.44 5.44 0 015.86-1.05zM125.13 14.76c2.4 0 4.2.77 5.4 2.3a6.44 6.44 0 011.16 5.54c-.01.13-.04.26-.08.4-.1.4-.48.66-.9.66h-9.2c-.53 0-.98.4-.9.92.1.67.38 1.2.84 1.61.66.59 1.51.88 2.57.88 1.49 0 2.82-.52 4-1.56.08-.06.17-.1.26-.1.11 0 .22.05.3.14l1.43 1.7a.46.46 0 01-.03.6 9.23 9.23 0 01-6.62 2.65c-2.22 0-4-.7-5.38-2.11a6.64 6.64 0 01-1.84-5.36 8.27 8.27 0 014.25-6.97 9.12 9.12 0 014.74-1.3zm-3.55 4.96c-.37.57.11 1.23.78 1.23h4.2c.53 0 1-.43.87-.95a2.63 2.63 0 00-.47-.97c-.48-.67-1.24-1-2.25-.99-.91 0-1.7.26-2.35.78-.3.26-.56.57-.78.9zM140.43 30.5c-2.15 0-3.9-.68-5.26-2.04a7.02 7.02 0 01-2.05-5.23 8.25 8.25 0 013.5-6.81 9.21 9.21 0 015.35-1.66c2.59 0 4.57.86 5.96 2.58.08.1.1.23.07.36a.4.4 0 01-.14.2l-2.7 2.15a.4.4 0 01-.23.09.41.41 0 01-.33-.16 3.38 3.38 0 00-2.79-1.3c-1.13 0-2.07.34-2.81 1.03a4.29 4.29 0 00-1.3 3.26c0 1.1.32 1.96.95 2.62.61.66 1.44 1 2.47 1 1.07 0 2.03-.4 2.86-1.18a.4.4 0 01.57.02l1.9 2.12a.42.42 0 01-.02.58 8.45 8.45 0 01-6 2.37zM160.45 17.72a1 1 0 01-.99.82h-2.64a1 1 0 00-.99.83l-.92 5.12c-.25 1.38.2 2.07 1.38 2.07.49 0 .95-.15 1.4-.44a.35.35 0 01.38-.01c.07.04.12.11.14.2l.65 2.39a.67.67 0 01-.26.71 6.33 6.33 0 01-3.63 1.09c-1.62 0-2.89-.47-3.8-1.41-.92-.92-1.23-2.3-.91-4.15l.95-5.22a1 1 0 00-.98-1.18h-.19a1 1 0 01-.98-1.17l.24-1.41a1 1 0 01.99-.83h.93a1 1 0 00.98-.82l.53-2.95a1 1 0 01.9-.82l3.36-.3a.4.4 0 01.42.48l-.58 3.23a1 1 0 00.98 1.18h1.9a1 1 0 01.99 1.17l-.25 1.42zM171.14 23.98l1.43-8.03a1 1 0 01.99-.82h2.56a1 1 0 01.99 1.18l-2.33 13a1 1 0 01-.98.82h-2.54a.38.38 0 01-.38-.45c.06-.36-.38-.62-.68-.4a6.53 6.53 0 01-3.78 1.22c-1.8 0-3.16-.6-4.07-1.78-.92-1.18-1.21-2.75-.88-4.71l1.45-8.06a1 1 0 01.98-.82h2.61a1 1 0 01.99 1.18l-1.34 7.46c-.14.85-.04 1.53.3 2.04.34.5.88.75 1.61.75 1.03 0 1.83-.39 2.4-1.15.31-.33.53-.8.67-1.43zM183.7 30.53c-1.49 0-2.8-.26-3.96-.78a5.19 5.19 0 01-2.4-1.85.43.43 0 01-.06-.31c.02-.1.07-.2.15-.26l2.24-2.09c.07-.06.15-.1.24-.1.11 0 .22.07.3.16.32.44.84.83 1.54 1.17.77.38 1.54.57 2.31.57.61 0 1.08-.12 1.41-.35.34-.24.51-.56.51-.97 0-.24-.09-.47-.27-.67-.18-.22-.4-.39-.65-.52-.33-.15-.65-.29-.97-.4a10.5 10.5 0 01-3.05-1.46 3.4 3.4 0 01-1.49-2.96c0-1.46.6-2.66 1.79-3.58a7.44 7.44 0 014.7-1.4 9.2 9.2 0 013.52.66c.98.41 1.72.96 2.22 1.66.07.09.1.2.07.32-.01.1-.06.2-.14.27l-2.17 1.91a.42.42 0 01-.27.1.44.44 0 01-.32-.14 4.26 4.26 0 00-1.4-1 4.38 4.38 0 00-1.82-.4c-.52 0-.94.1-1.26.32a.94.94 0 00-.47.82c0 .21.1.4.28.54.24.2.5.35.78.47l.43.19a44.05 44.05 0 001.33.52 7.64 7.64 0 012.7 1.85c.58.67.87 1.52.87 2.53 0 1.59-.61 2.84-1.84 3.77a7.79 7.79 0 01-4.85 1.4z"
          fill="#fff"
        ></path>
      </svg>

      <div class="flex-1"></div>

      <div class="w-100 hidden md:block">
        <TextField
          placeholder="Search here..."
          prepend="i-fa-search"
          tabindex="-1"
          @focus="flux.searchDialog = true"
        />
      </div>

      <Button
        :icon="isDark ? 'i-material-symbols-dark-mode-rounded' : 'i-material-symbols-light-mode'"
        @click="toggleDark()"
      />

      <Button
        :icon="textDirection === 'rtl' ? 'i-mdi-rtl' : 'i-mdi-ltr'"
        @click="textDirection = textDirection === 'rtl' ? 'ltr' : 'rtl'"
      />

      <Dropdown>
        <div
          class="text-white bg-primary-600 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer transition hover:scale-125"
        >
          {{ flux.avatar(flux.user.fullName) }}
        </div>

        <template #options>
          <div class="py-2 px-4 text-sm">
            <div class="font-bold">{{ flux.user.fullName }}</div>
            <div>{{ flux.user.email }}</div>
          </div>

          <div class="border dark:border-slate-600"></div>

          <div class="px-1 py-2 text-sm">
            <div
              class="px-3 py-1 cursor-pointer hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600 hover:rounded-md"
            >
              Profile
            </div>
            <div
              class="px-3 py-1 cursor-pointer hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600 hover:rounded-md"
            >
              Settings
            </div>
          </div>

          <div class="border dark:border-slate-600"></div>

          <div class="px-1 py-2 text-sm">
            <div
              class="px-3 py-1 cursor-pointer hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600 hover:rounded-md"
              @click="flux.signOut"
            >
              Sign out
            </div>
          </div>
        </template>
      </Dropdown>
    </header>

    <aside
      class="sidebar px-2 pt-4 pb-20 bg-white dark:bg-slate-900 dark:border-slate-700 shadow-lg hidden xl:block"
    >
      <div v-if="flux.userLoading" class="flex justify-center items-center h-full">
        <Spinner class="w-12 h-12" />
      </div>

      <template v-else>
        <template v-for="link in state.listOfLinks" :key="link.name">
          <NavLink
            :icon="link.icon"
            :name="link.name"
            :to="link.to"
            :permissions="link.permissions"
            :sub="link.sub"
            :level="link.level"
            :status="link.status"
          />
        </template>
      </template>
    </aside>

    <div class="flex flex-col h-full">
      <main class="page container w-full self-center">
        <div v-if="flux.userLoading" class="flex justify-center items-center h-full">
          <Spinner class="w-12 h-12" />
        </div>

        <template v-else>
          <slot></slot>
        </template>
      </main>

      <footer class="footer">
        <div>
          <div class="font-bold">Backstage Management System</div>
        </div>

        <div class="flex-1"></div>

        <div class="flex items-center">
          <div class="i-fa-language w-6 h-6"></div>

          <Select
            v-model:value="localer.lang.value"
            :options="[
              { label: 'English', value: 'en-US' },
              { label: '日本語', value: 'ja-JP' },
              { label: '한국어', value: 'ko-KR' },
              { label: '正體中文', value: 'zh-TW' },
            ]"
            class="min-w-50 ltr:ml-2 rtl:mr-2"
            @change="flux.changeLang"
          />
        </div>
      </footer>
    </div>

    <Dialog v-model="flux.authDialog">
      <div class="text-2xl">{{ flux.userError.error }}</div>
      <div class="my-2">{{ flux.userError.message }}</div>

      <div class="flex justify-end">
        <Button @click="flux.authDialog = false">Okay, got it</Button>
      </div>
    </Dialog>

    <Dialog v-model="flux.searchDialog">
      <TextField placeholder="Search here..." prepend="i-fa-search" autocomplete="off" />
      <div class="flex justify-center items-center h-66">No recent searches</div>
    </Dialog>

    <Drawer
      v-model="flux.navDrawer"
      :placement="textDirection === 'rtl' ? 'right' : 'left'"
      class="px-2 pt-4 pb-20"
    >
      <div v-if="flux.userLoading" class="flex justify-center items-center h-full">
        <Spinner class="w-12 h-12" />
      </div>

      <template v-else>
        <div class="w-full block md:hidden mb-4">
          <TextField
            placeholder="Search here..."
            prepend="i-fa-search"
            autocomplete="off"
            @focus="flux.searchDialog = true"
          />
        </div>

        <template v-for="link in state.listOfLinks" :key="link.name">
          <NavLink
            :icon="link.icon"
            :name="link.name"
            :to="link.to"
            :permissions="link.permissions"
            :sub="link.sub"
            :level="link.level"
            :status="link.status"
          />
        </template>
      </template>
    </Drawer>
  </div>

  <IdleDialog />
</template>

<style lang="scss" scoped>
.topbar {
  @apply fixed top-0 z-100 w-full;

  background: linear-gradient(172deg, #172940 -50%, #64f 30%, #64f 50%, #f9d 200%);
}

.sidebar {
  @apply fixed top-20 bottom-0 z-99 w-64 overflow-y-auto;
  @apply ltr:left-0	rtl:right-0;
  @apply ltr:border-r rtl:border-l;
}

.page {
  @apply p-8 pt-28 flex-1;
  @apply ltr:xl:pl-72 rtl:xl:pr-72;
}

.footer {
  @apply flex flex-col md:flex-row p-8 gap-2;
  @apply bg-slate-50 dark:bg-slate-900 border-t dark:border-slate-700;
  @apply ltr:xl:pl-72 rtl:xl:pr-72;
}
</style>
