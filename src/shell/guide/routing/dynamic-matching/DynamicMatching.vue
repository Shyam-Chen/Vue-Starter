<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Dynamic Matching</div>

      <UserList />
    </v-layout>
  </v-container>
</template>

<script>
import UserList from './UserList';

export default {
  components: {
    UserList,
  },
};
</script>

<style scoped>
</style>
