<script setup>
console.log('import.meta.env =', import.meta.env);
</script>

<template>
  <img alt="Vue logo" src="~/assets/logo.png" />
  <div>{{ $f('Hello, {msg}!', { msg: 'Vue' }) }}</div>
  <router-link :to="{ name: 'helloWorld' }" class="text-blue-500">Hello World</router-link>
</template>
