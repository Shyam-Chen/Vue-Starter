<script lang="ts" setup>
import { XSpinner } from '@x/ui';

import useStore from './store';
import NavLink from './NavLink.vue';

const { state } = useStore();
</script>

<template>
  <div v-if="state.userLoading" class="flex justify-center items-center h-full">
    <XSpinner class="w-12 h-12" />
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
