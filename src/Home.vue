<script setup>
console.log('APP_NAME', import.meta.env.APP_NAME);
</script>

<template>
  <img alt="Vue logo" src="~/assets/logo.png" />
  <div>234234</div>
  <router-link :to="{ name: 'helloWorld' }" class="text-blue-500"> hello-world </router-link>
</template>
