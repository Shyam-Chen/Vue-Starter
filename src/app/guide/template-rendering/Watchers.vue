<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Watchers</div>
    <v-text-field v-model="text" name="text" label="Text" style="width: 15rem;"></v-text-field>
    <div v-if="isTyping">Typing...</div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      isTyping: false,
    };
  },
  watch: {
    text() {
      this.isTyping = true;
      setTimeout(() => { this.isTyping = false; }, 750);
    },
  },
};
</script>

<style scoped>
</style>
