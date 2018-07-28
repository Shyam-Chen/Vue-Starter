<template>
  <v-container class="shell-container" fluid>
    <div class="headline">Transitions</div>

    <FadeInAndOut />
    <FilerList />
    <SortFilterList />
  </v-container>
</template>

<script>
// @flow

import FadeInAndOut from './FadeInAndOut';
import FilerList from './FilerList';
import SortFilterList from './SortFilterList';

export default {
  components: {
    FadeInAndOut,
    FilerList,
    SortFilterList,
  },
};
</script>

<style scoped>
</style>
