<template>
  <v-layout>
    <v-btn @click="setLanguage('en')">English</v-btn>
    <v-btn @click="setLanguage('zh')">中文</v-btn>
    <v-btn @click="setLanguage('ja')">日本語</v-btn>
    <p>{{ $t('message.hello') }}</p>
  </v-layout>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
