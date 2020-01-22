<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline mb-1">Dependency Injection</div>

      <Provider>
        <Child />
        <Child>
          <Child />
        </Child>
      </Provider>
    </v-layout>
  </v-container>
</template>

<script>
import Provider from './Provider';
import Child from './Child';

export default {
  components: {
    Provider,
    Child,
  },
};
</script>
