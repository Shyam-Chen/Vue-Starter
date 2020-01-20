<template>
  <v-container class="shell-container" fluid>
    <v-layout>
      Header
    </v-layout>

    <v-layout>
      <v-btn to="/guide/routing/nested-routes/first">First</v-btn>
      <v-btn to="/guide/routing/nested-routes/second">Second</v-btn>
    </v-layout>

    <router-view></router-view>
  </v-container>
</template>

<script>
export default {};
</script>
