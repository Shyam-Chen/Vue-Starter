<script setup>
console.log('import.meta.env =', import.meta.env);
</script>

<template>
  <img alt="Vue logo" src="~/assets/logo.png" />
  <div>234234</div>
  <router-link :to="{ name: 'helloWorld' }" class="text-blue-500">Hello World</router-link>
</template>
