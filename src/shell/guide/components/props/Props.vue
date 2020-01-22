<template>
  <v-container fluid>
    <v-layout column>
      <Title />
      <Title label="Oh My Vue" />
    </v-layout>

    <v-layout column>
      <UserCard
        first-name="Steven"
        last-name="Spielberg"
        email="steven.spielberg@gmail.com"
        phone="+49 2232 3818"
      />
      <UserCard v-bind="userInfoA" />
      <UserCard v-bind="userInfoB" />
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import Title from './Title';
import UserCard from './UserCard';

export default {
  components: {
    Title,
    UserCard,
  },
  data() {
    return {
      userInfoA: {
        firstName: 'Shyam',
        lastName: 'Chen',
        email: 'shyam.chen@gmail.com',
      },
      userInfoB: {
        firstName: 'Jason',
        lastName: 'Oner',
        phone: '+61 9811 2345',
      },
    };
  },
};
</script>
