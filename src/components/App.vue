<template>
  <div>
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Helo, Vue'
    }
  }
}
</script>

<style>
.message {
  color: pink;
  font-size: 1.4em;
}
</style>

<!-- <template>
  <div id="app">
    <img src="./assets/logo.png">
    <a href="#/">Home</a>
    <a href="#/about">About</a>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
