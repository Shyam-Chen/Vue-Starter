<i18n>
en:
  message:
    hello: "hello world!"

zh:
  message:
    hello: "你好，世界！"

ja:
  message:
    hello: "こんにちは、世界！"
</i18n>

<template>
  <v-layout column>

    <v-layout row>
      <div>
        <v-btn @click="setLanguage('en')">English</v-btn>
        <v-btn @click="setLanguage('zh')">中文</v-btn>
        <v-btn @click="setLanguage('ja')">日本語</v-btn>
      </div>
    </v-layout>

    <v-layout row>
      <p class="pa-3">{{ $t('message.hello') }}</p>
    </v-layout>

  </v-layout>
</template>

<script>
export default {
  methods: {
    setLanguage(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style scoped>
</style>
