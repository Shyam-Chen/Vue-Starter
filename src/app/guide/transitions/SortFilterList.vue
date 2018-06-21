<template>
  <v-layout column class="mt-1 mb-1">

    <v-layout row wrap align-center>
      <div>Sort</div>
      <v-btn :class="{ primary: sort === 'published' }" @click="sort = 'published'">published</v-btn>
      <v-btn :class="{ primary: sort === 'views' }" @click="sort = 'views'">Views</v-btn>
      <v-btn :class="{ primary: sort === 'collections' }" @click="sort = 'collections'">Collections</v-btn>
    </v-layout>

    <v-layout row wrap align-center>
      <div>Length</div>
      <v-btn :class="{ primary: length === 'any' }" @click="length = 'any'">Any</v-btn>
      <v-btn :class="{ primary: length === 'five' }" @click="length = 'five'">Less than five minutes</v-btn>
      <v-btn :class="{ primary: length === 'fiveToTen' }" @click="length = 'fiveToTen'">Five to ten minutes</v-btn>
      <v-btn :class="{ primary: length === 'ten' }" @click="length = 'ten'">More than ten minutes</v-btn>
    </v-layout>

    <v-layout v-if="sortFilterList.length !== 0" row wrap>
      <template v-for="item in sortFilterList">
        <div :key="item.id" class="card ma-3">
          <div class="card-media">
            <img :src="item.thumbnail" class="card-image">
            <div>
              <span class="black white--text pa-1 card-time">{{ item.duration | convertSeconds }}</span>
            </div>
          </div>

          <div class="card-content">
            <div class="pl-2 pr-2">{{ item.title | truncate(55) }}</div>
            <div class="ma-2"><v-icon>headset</v-icon> {{ item.views.toLocaleString('en-US') }}</div>
          </div>
        </div>
      </template>
    </v-layout>

    <div v-else>No results</div>

  </v-layout>
</template>

<script>
import axios from 'axios';

import { compose } from '~/shared/utilities';

import truncate from '../filters/truncate';

export default {
  filters: {
    truncate,
    convertSeconds(value) {
      const second = Math.round(value % 60);
      const minute = Math.round(value / 60);

      if (second < 10) return `${minute}:0${second}`;

      return `${minute}:${second}`;
    },
  },
  data() {
    return {
      sort: 'published',
      length: 'any',
      list: [],
    };
  },
  computed: {
    sortFilterList() {
      return this.compose(
        this.sortList(this.sort),
        this.filerList(this.length),
      )(this.list);
    },
  },
  mounted() {
    axios.get('https://us-central1-lithe-window-713.cloudfunctions.net/fronted-demo')
      .then(({ data }) => {
        this.list = data.data;
      });
  },
  methods: {
    compose,
    sortList(sort) {
      return (list) => {
        if (sort) {
          return list.sort((a, b) => a[sort] - b[sort]).reverse();
        }

        return list;
      };
    },
    filerList(length) {
      return list =>
        list.filter((item) => {
          if (length === 'five') return item.duration < 300;
          if (length === 'fiveToTen') return item.duration >= 300 && item.duration <= 600;
          if (length === 'ten') return item.duration > 600;

          return list;
        });
    },
  },
};
</script>

<style scoped>
.card-media {
  position: relative;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.card-image {
  width: 240px;
  height: 135px;
}

.card-time {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
}

.card-content {
  width: 240px;
  height: 93px;
}
</style>
