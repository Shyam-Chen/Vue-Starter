<template>
  <v-card class="ma-3 o-card">
    <v-card-title primary-title>
      <div>
        <div class="headline">Profile</div>
        <div class="body-1">
          <div v-if="firstName || lastName">Name: {{ firstName }} {{ lastName }}</div>
          <div v-if="email">Email: {{ email }}</div>
          <div v-if="phone">Phone: {{ phone }}</div>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
// @flow

export default {
  props: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
};
</script>

<style scoped>
.o-card {
  width: 20rem;
}
</style>
