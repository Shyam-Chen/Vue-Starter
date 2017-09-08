<template>
  <p class="text">{{ text }}</p>
</template>

<style>
  .text {
    color: blue;
  }
</style>

<script>
export default {
  name: 'about',
  data () {
    return {
      text: 'About Component'
    }
  }
}
</script>
