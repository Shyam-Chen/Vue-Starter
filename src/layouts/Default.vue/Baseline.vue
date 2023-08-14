<script lang="ts" setup>
import { reactive, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLocaler, useLocale } from 'vue-localer';
import { useIdle, useDark, useToggle, useTextDirection } from '@vueuse/core';

import TextField from '~/components/TextField.vue';
import Dropdown from '~/components/Dropdown.vue';
import Select from '~/components/Select.vue';
import Dialog from '~/components/Dialog.vue';
import Button from '~/components/Button.vue';
import Drawer from '~/components/Drawer.vue';

import request from '~/utilities/request';

import NavLink from './NavLink.vue';
import useDefault from './store';

const router = useRouter();
const route = useRoute();
const localer = useLocaler();
const locale = useLocale();
const { idle } = useIdle(30 * 60 * 1000);
const isDark = useDark();
const toggleDark = useToggle(isDark);
const textDirection = useTextDirection();

const { state } = useDefault();

const flux = reactive({
  user: {} as any,
  userError: {} as any,

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/sign-in');
  },
  idleDialog: false,
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
  () => idle.value,
  (val) => {
    if (val) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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

onMounted(async () => {
  const response = await request('/auth/user', { method: 'GET' });

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
    <header class="topbar px-6 py-4 flex items-center gap-4 backdrop-blur shadow-lg">
      <div
        class="i-ic-round-menu w-8 h-8 dark:text-white cursor-pointer transition hover:scale-125 xl:hidden"
        @click="flux.navDrawer = true"
      ></div>

      <div class="i-simple-icons-deno w-12 h-12 dark:text-white"></div>
      <div class="text-3xl font-bold dark:text-white">{{ locale.title }}</div>

      <div class="flex-1"></div>

      <div class="w-100">
        <TextField
          placeholder="Search here..."
          prepend="i-fa-search"
          autocomplete="off"
          @focus="flux.searchDialog = true"
        />
      </div>

      <Button
        variant="text"
        :icon="isDark ? 'i-material-symbols-dark-mode-rounded' : 'i-material-symbols-light-mode'"
        @click="toggleDark()"
      />

      <Button
        variant="text"
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
    </aside>

    <div class="flex flex-col h-full">
      <main class="page container w-full self-center">
        <slot></slot>
      </main>

      <div class="flex-1"></div>

      <footer
        class="footer bg-slate-50 dark:bg-slate-900 border-t dark:border-slate-700 p-4 flex justify-between"
      >
        <div>
          <div class="font-bold">Backstage Management System</div>
          <div>Design for desktop displays from 1024x768 through 1920x1080</div>
        </div>

        <div></div>

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

    <Dialog v-model="flux.idleDialog">
      <div class="text-2xl">Idle Time-out</div>
      <div class="my-2">Please sign-in again.</div>

      <div class="flex justify-end">
        <Button @click="flux.idleDialog = false">Okay, got it</Button>
      </div>
    </Dialog>

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
      class="px-2 pt-4 pb-20 bg-white dark:bg-slate-900 dark:border-slate-700"
    >
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
    </Drawer>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  @apply fixed top-0 z-100 w-full;
}

.sidebar {
  @apply fixed top-20 bottom-0 z-99 w-64 overflow-y-auto;
  @apply ltr:left-0	rtl:right-0;
  @apply ltr:border-r rtl:border-l;
}

.page {
  @apply p-8 pt-28;
  @apply ltr:xl:pl-72 rtl:xl:pr-72;
}

.footer {
  @apply p-8;
  @apply ltr:xl:pl-72 rtl:xl:pr-72;
}
</style>
