<template>
  <div>
    <div class="message">
      {{ message }}
    </div>

    <ul>
      <li v-for="item in list">
        {{ item.primary }} {{ item.accent }}
      </li>
    </ul>

    <input type="text" v-model="thing">

    <div>
      <button v-on:click="counter++">Increment</button>
      <span>Clicked: {{ counter }} times</span>
    </div>

    <div v-bind:class="{ active: isActive }">Vue + Vuex</div>

    <button @click="onLog">Click Me (Log)</button>

    <home></home>
    <about></about>

    <counter></counter>
  </div>
</template>

<script>
import Home from './Home.vue';
import About from './About.vue';

import Counter from '../containers/Counter.vue';

export default {
  data() {
    return {
      message: 'Helo, Vue',

      list: [
        { id: 3, primary: 'Angular', accent: 'Ngrx' },
        { id: 2, primary: 'React', accent: 'Redux' },
        { id: 1, primary: 'Vue', accent: 'Vuex' },
      ],

      thing: 'foo bar',

      counter: 0,

      isActive: true,
    }
  },
  methods: {
    onLog() {
      console.log(123);
    }
  },

  components: { Home, About, Counter }
}
</script>

<style>
.message {
  color: pink;
  font-size: 1.4em;
}

.active {
  color: blue;
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
