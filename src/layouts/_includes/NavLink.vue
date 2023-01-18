<script lang="ts" setup>
import type { PropType } from 'vue';
import { reactive } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import ExpandTransition from '~/components/ExpandTransition.vue';

import type { Link } from './list-of-links';

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
});

const route = useRoute();

const flux = reactive({
  status: false,
  toggle() {
    flux.status = !flux.status;
  },

  parent(sub: Link['sub']): any {
    return sub?.find((link) => {
      if (link.sub) return flux.parent(link.sub);
      return link.to === route.path;
    });
  },
});
</script>

<template>
  <RouterLink
    v-if="to || sub.length"
    :to="to || ''"
    class="px-4 py-2 flex cursor-pointer hover:text-blue-500 dark:hover:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-600 hover:rounded-md"
    :class="{
      'text-blue-500 font-bold': flux.parent(sub),
      'text-blue-500 dark:text-blue-200 bg-blue-200 dark:bg-blue-700 rounded-md font-bold': to === route.path,
    }"
    :style="{ 'padding-left': `${level}rem` }"
    @click.stop="flux.toggle"
  >
    <div v-if="icon" :class="icon" class="w-6 h-6 mr-2"></div>
    <div class="flex-1" :class="{ 'pl-4': level !== 1 }">{{ name }}</div>
    <div v-if="sub.length && !flux.status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
    <div v-if="sub.length && flux.status" class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
  </RouterLink>

  <div v-else class="mt-4 px-4 py-2 text-sm text-slate-400 dark:text-slate-500 uppercase font-bold">
    {{ name }}
  </div>

  <ExpandTransition>
    <div v-show="sub.length && flux.status">
      <NavLink
        v-for="(item, index) in sub"
        :key="index"
        :name="item.name"
        :to="item.to"
        :permissions="item.permissions"
        :sub="item.sub"
        :level="item.level"
        :role="role"
      />
    </div>
  </ExpandTransition>
</template>
