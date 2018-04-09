<i18n src="./translation.yml"></i18n>

<template>
  <v-layout column>
    <div class="headline">Internationalization</div>

    <v-layout row>
      <p class="pl-2 pt-4">
        HTML formatting:
        <b>{{ $t('bubble') }}</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        Named formatting:
        <b>{{ $t('hello', { msg: 'Vue' }) }}</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        List formatting:
        <b>{{ $t('thinkIn', ['Angular', 'React', 'Vue']) }}</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        Pluralization:
        <b>{{ $tc('http', 2) }}://google.com</b>
      </p>
    </v-layout>

    <v-layout row>
      <p class="pl-2">
        Pluralizing i18n:
        <b>{{ $tc('framework', 0) }}</b>,
        <b>{{ $tc('framework', 1) }}</b>,
        <b>{{ $tc('framework', 3, { num: 3 }) }}</b>
      </p>
    </v-layout>

  </v-layout>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
