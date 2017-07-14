<template>
  <p class="text">{{ text }}</p>
</template>

<style>
  .text {
    color: red;
  }
</style>

<script>
export default {
  name: 'home',
  data () {
    return {
      text: 'Home Component'
    }
  }
}
</script>
