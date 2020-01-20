<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <div class="text-xs-center">
        <div class="display-2 primary--text pa-3">Whoops, 401!</div>
        <div class="pa-2">You don't have permission to go to this page.</div>
        <v-btn to="/" color="primary" outline>Get me out of here!</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

export default {
  metaInfo: {
    title: 'Unauthorized | Oh My Vue',
  },
};
</script>
