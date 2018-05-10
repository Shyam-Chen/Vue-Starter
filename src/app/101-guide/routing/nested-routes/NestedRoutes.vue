<template>
  <v-container>

    <v-layout>
      Header
    </v-layout>

    <v-layout>
      <v-btn to="/101-guide/routing/nested-routes/first">First</v-btn>
      <v-btn to="/101-guide/routing/nested-routes/second">Second</v-btn>
    </v-layout>

    <router-view></router-view>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
