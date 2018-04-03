<i18n src="./translation.yml"></i18n>

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
      <p class="pl-2 pt-4">
        HTML formatting:
        <b class="indigo--text">{{ $t('bubble') }}</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        Named formatting:
        <b class="indigo--text">{{ $t('hello', { msg: 'Vue' }) }}</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        List formatting:
        <b class="indigo--text">{{ $t('thinkIn', ['Angular', 'React', 'Vue']) }}</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        Pluralization:
        <b class="indigo--text">{{ $tc('http', 2) }}://google.com</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        Pluralizing i18n:
        <b class="indigo--text">{{ $tc('framework', 0) }}</b>,
        <b class="indigo--text">{{ $tc('framework', 1) }}</b>,
        <b class="indigo--text">{{ $tc('framework', 3, { num: 3 }) }}</b>
      </p>
    </v-layout>

  </v-layout>
</template>

<script>
export default {
  created() {
    const languages = ['en', 'zh', 'ja'];
    languages.forEach((item) => {
      if ((navigator.language).includes(item)) {
        this.$i18n.locale = item;
      }
    });
  },
  methods: {
    setLanguage(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style scoped>
</style>
