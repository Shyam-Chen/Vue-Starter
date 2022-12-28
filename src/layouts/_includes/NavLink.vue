<script lang="ts" setup>
import type { PropType } from 'vue';
import { reactive } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import ExpandTransition from '~/components/ExpandTransition.vue';

import type { Link } from './list-of-links';

const props = defineProps({
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

  role: {
    type: String as PropType<'A' | 'B' | 'C' | 'D' | 'E'>,
    default: '',
  },

  firstLevelStatus: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const flux = reactive({
  status: props.firstLevelStatus,
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
    :to="to || ''"
    class="px-4 py-2 hover:text-blue-500 flex cursor-pointer"
    :class="{ 'text-blue-500 font-bold': to === route.path || flux.parent(sub) }"
    @click.stop="flux.toggle"
  >
    <div v-if="icon" :class="icon" class="w-6 h-6 mr-2"></div>
    <div :class="{ 'pl-4': !firstLevelStatus }">{{ name }}</div>
    <div v-if="sub.length && !flux.status" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
    <div v-if="sub.length && flux.status" class="i-ic-baseline-arrow-drop-up w-6 h-6"></div>
  </RouterLink>

  <ExpandTransition>
    <div v-show="sub.length && flux.status" class="pl-4">
      <NavLink
        v-for="(item, index) in sub"
        :key="index"
        :name="item.name"
        :to="item.to"
        :permissions="item.permissions"
        :sub="item.sub"
        :role="role"
      />
    </div>
  </ExpandTransition>
</template>
