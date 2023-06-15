<script lang="ts" setup>
import type { PropType } from 'vue';
import { reactive } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useTextDirection } from '@vueuse/core';

import Collapse from '~/components/Collapse.vue';

import type { Link } from './list-of-links';
import useDefault from './store';

defineProps({
  icon: {
    type: String as PropType<Link['icon']>,
    default: '',
  },
  name: {
    type: String as PropType<Link['name']>,
    default: '',
  },
  to: {
    type: String as PropType<Link['to']>,
    default: '',
  },
  permissions: {
    type: Array as PropType<Link['permissions']>,
    default: () => [],
  },
  aiDisable: {
    type: Boolean as PropType<Link['aiDisable']>,
    default: false,
  },
  sub: {
    type: Array as PropType<Link[]>,
    default: () => [],
  },
  level: {
    type: Number,
    default: 1,
  },
  role: {
    type: String as PropType<'A' | 'B' | 'C' | 'D' | 'E'>,
    default: '',
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const textDirection = useTextDirection({ observe: true });

const { actions } = useDefault();

const flux = reactive({
  parent(sub: Link['sub']): any {
    return sub?.find((link) => {
      if (link.sub) return flux.parent(link.sub);
      return link.to === route.path;
    });
  },
});
</script>

<template>
  <div
    v-if="sub.length"
    class="link"
    :class="{
      'link-parent': flux.parent(sub),
      'link-current': to === route.path,
    }"
    :style="[
      textDirection === 'rtl'
        ? { 'padding-right': `${level}rem` }
        : { 'padding-left': `${level}rem` },
    ]"
    @click.stop="actions.changeStatus(name, level)"
  >
    <div v-if="icon" :class="icon" class="w-6 h-6 ltr:mr-2 rtl:ml-2"></div>
    <div class="flex-1" :class="{ 'ltr:pl-4 rtl:pr-4': level !== 1 }">{{ name }}</div>
    <div v-if="!status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
    <div v-if="status" class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
  </div>

  <RouterLink
    v-else-if="to"
    :to="to"
    class="link"
    :class="{
      'link-parent': flux.parent(sub),
      'link-current': to === route.path,
    }"
    :style="[
      textDirection === 'rtl'
        ? { 'padding-right': `${level}rem` }
        : { 'padding-left': `${level}rem` },
    ]"
  >
    <div v-if="icon" :class="icon" class="w-6 h-6 ltr:mr-2 rtl:ml-2"></div>
    <div class="flex-1" :class="{ 'ltr:pl-4 rtl:pr-4': level !== 1 }">{{ name }}</div>
  </RouterLink>

  <div v-else class="mt-4 px-4 py-2 text-sm text-slate-400 dark:text-slate-500 uppercase font-bold">
    {{ name }}
  </div>

  <Collapse>
    <div v-show="sub.length && status">
      <NavLink
        v-for="(item, index) in sub"
        :key="index"
        :name="item.name"
        :to="item.to"
        :permissions="item.permissions"
        :sub="item.sub"
        :level="item.level"
        :role="role"
        :status="item.status"
      />
    </div>
  </Collapse>
</template>

<style lang="scss" scoped>
.link {
  @apply px-4 py-2 flex cursor-pointer hover:rounded-md;
  @apply hover:text-primary-500 hover:bg-primary-100;
  @apply dark:hover:text-primary-100 dark:hover:bg-primary-600;

  &-parent {
    @apply text-primary-500 font-bold;
  }

  &-current {
    @apply rounded-md font-bold;
    @apply text-primary-500 dark:text-primary-200 bg-primary-200 dark:bg-primary-700;
  }
}
</style>
