<script lang="ts" setup>
import { XSkeleton } from '@x/ui';
import NavLink from './NavLink.vue';
import useStore from './store';

const { state } = useStore();
</script>

<template>
  <div v-if="state.userLoading" class="flex flex-col h-full">
    <XSkeleton class="w-full h-10" />

    <div class="w-full h-9 mt-4 py-2">
      <XSkeleton class="w-1/3 h-full" />
    </div>

    <XSkeleton v-for="num in 7" :key="num" class="w-full h-10 mb-1" />

    <div class="w-full h-9 mt-4 py-2">
      <XSkeleton class="w-1/3 h-full" />
    </div>

    <XSkeleton v-for="num in 4" :key="num" class="w-full h-10 mb-1" />
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
</template>
