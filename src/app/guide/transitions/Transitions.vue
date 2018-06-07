<template>
  <v-container fluid>
    <div class="headline">Transitions</div>

    <FadeInAndOut />
    <FilerList />
  </v-container>
</template>

<script>
import FadeInAndOut from './FadeInAndOut';
import FilerList from './FilerList';

export default {
  components: {
    FadeInAndOut,
    FilerList,
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
