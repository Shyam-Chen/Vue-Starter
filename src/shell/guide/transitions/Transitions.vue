<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline mb-1">Transitions</div>

      <FadeInAndOut />
      <FilerList />
      <SortFilterList />
    </v-layout>
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
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
