<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Visibility</div>

    <v-layout>
      <div>
        <v-text-field v-visibility="isVisibility" label="Password" value="qaz123456" type="password"></v-text-field>
      </div>

      <v-btn flat icon @click="isVisibility = !isVisibility">
        <v-icon>{{ isVisibility ? 'visibility' : 'visibility_off' }}</v-icon>
      </v-btn>
    </v-layout>

    <v-layout>
      <div>
        <v-text-field :append-icon="isVisibility ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (isVisibility = !isVisibility)" :type="isVisibility ? 'text' : 'password'" label="Password" value="qaz123456"></v-text-field>
      </div>
    </v-layout>
  </v-layout>
</template>

<script>
const handler = (el, binding) => {
  const input = el.querySelector('input');
  input.type = binding.value ? 'text' : 'password';
};

export default {
  directives: {
    // v-visibility
    visibility: {
      bind: handler,
      update: handler,
    },
  },
  data() {
    return {
      isVisibility: false,
    };
  },
};
</script>

<style scoped>
</style>
