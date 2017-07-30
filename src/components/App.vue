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
      <button @click="counter++">Increment</button>
      <span>Clicked: {{ counter }} times</span>
    </div>

    <div :class="{ active: isActive }">Vue + Vuex</div>

    <button @click="onLog">Click Me (Log)</button>

    <home></home>
    <about></about>

    <counter></counter>

    <md-button class="md-primary">Primary</md-button>
    <md-button class="md-accent">Accent</md-button>

    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Nutrition</h1>
        <md-button class="md-icon-button">
          <md-icon>filter_list</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>

      <md-table md-sort="dessert" md-sort-type="desc" @select="onSelect" @sort="onSort">
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="dessert">Dessert (100g serving)</md-table-head>
            <md-table-head md-sort-by="calories" md-numeric md-tooltip="The total amount of food energy and the given serving size">Calories (g)</md-table-head>
            <md-table-head md-sort-by="fat" md-numeric>Fat (g)</md-table-head>
            <md-table-head>
              <md-icon>message</md-icon>
              <span>Comments</span>
            </md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in nutrition" :key="rowIndex" :md-item="row" md-auto-select md-selection>
            <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :md-numeric="columnIndex !== 'dessert' && columnIndex !== 'comment'" v-if="columnIndex !== 'type'">
              {{ column }}
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>

      <md-table-pagination
        md-size="5"
        md-total="10"
        md-page="1"
        md-label="Rows"
        md-separator="of"
        :md-page-options="[5, 10, 25, 50]"
        @pagination="onPagination"></md-table-pagination>
    </md-table-card>
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

      nutrition: [
        {
          dessert: 'Frozen yogurt',
          type: 'ice_cream',
          calories: '159',
          fat: '6.0',
          comment: 'Icy'
        }, {
          dessert: 'Ice cream sandwich',
          type: 'ice_cream',
          calories: '237',
          fat: '9.0',
          comment: 'Super Tasty'
        }, {
          dessert: 'Eclair',
          type: 'pastry',
          calories: '262',
          fat: '16.0',
          comment: ''
        }, {
          dessert: 'Cupcake',
          type: 'pastry',
          calories: '305',
          fat: '3.7',
          comment: ''
        }, {
          dessert: 'Gingerbread',
          type: 'other',
          calories: '356',
          fat: '16.0',
          comment: ''
        }
      ],
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
}

.active {
  color: red;
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
