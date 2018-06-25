<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Watchers</div>

    <v-layout row>
      <div>
        <v-text-field v-model="text" name="text" label="Text"></v-text-field>
      </div>
    </v-layout>

    <div v-if="isTyping">Typing...</div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  text: string,
  isTyping: boolean,
};

export default {
  data(): Data {
    return {
      text: '',
      isTyping: false,
    };
  },
  watch: {
    text(): void {
      this.isTyping = true;

      setTimeout((): void => {
        this.isTyping = false;
      }, 750);
    },
  },
};
</script>

<style scoped>
</style>
