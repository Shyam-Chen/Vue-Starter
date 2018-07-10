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
      <v-btn :class="{ primary: length === 'lessThanFive' }" @click="length = 'lessThanFive'">Less than five minutes</v-btn>
      <v-btn :class="{ primary: length === 'fiveToTen' }" @click="length = 'fiveToTen'">Five to ten minutes</v-btn>
      <v-btn :class="{ primary: length === 'moreThanTen' }" @click="length = 'moreThanTen'">More than ten minutes</v-btn>
    </v-layout>

    <v-layout v-if="!isLoading">
      <transition-group v-if="sortFilterList.length !== 0" tag="div" name="fade-group" class="row-wrap">
        <template v-for="item in sortFilterList">
          <v-card :key="item.id" class="ma-2">
            <div class="card-media">
              <img :src="item.thumbnail" class="card-image">
              <div>
                <span class="black white--text pa-1 card-time">{{ item.duration | convertSeconds }}</span>
              </div>
            </div>

            <div class="card-content">
              <div class="pl-2 pr-2">{{ item.title | truncate(55) }}</div>
              <div class="ma-2"><v-icon>headset</v-icon> {{ item.views.toLocaleString('en-US') }}</div>
              <div><v-icon>event</v-icon> {{ item.publish * 1000 | timeSince }}</div>
              <div><v-icon>video_library</v-icon> {{ item.collectCount.toLocaleString('en-US') }}</div>
            </div>
          </v-card>
        </template>
      </transition-group>

      <div v-else>No results</div>
    </v-layout>

    <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>

  </v-layout>
</template>

<script>
import axios from 'axios';

import { compose } from '~/shared/utils';

import truncate from '../filters/truncate';
import convertSeconds from '../filters/convert-seconds';
import timeSince from '../filters/time-since';

export default {
  filters: {
    truncate,
    convertSeconds,
    timeSince,
  },
  data() {
    return {
      sort: 'published',
      length: 'any',
      list: [],
      isLoading: true,
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
        this.isLoading = false;
      });
  },
  methods: {
    compose,
    sortList(sort) {
      return (list) => {
        const typedList = type => list.sort((a, b) => a[type] - b[type]).reverse();

        if (sort === 'published') return typedList('publish');
        if (sort === 'views') return typedList('views');
        if (sort === 'collections') return typedList('collectCount');

        return list;
      };
    },
    filerList(length) {
      return list => (
        list.filter((item) => {
          if (length === 'lessThanFive') return item.duration < 300;
          if (length === 'fiveToTen') return item.duration >= 300 && item.duration <= 600;
          if (length === 'moreThanTen') return item.duration > 600;

          return list;
        })
      );
    },
  },
};
</script>

<style scoped>
.fade-group-enter-active,
.fade-group-leave-active,
.fade-group-move {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-group-leave-active {
  position: absolute;
}

.fade-group-enter {
  opacity: 0;
  transform: translateY(-1.25rem);
}

.fade-group-leave-to {
  opacity: 0;
  transform: translateY(1.25rem);
}

.row-wrap {
  display: flex;
  flex-flow: row wrap;
}

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
  height: 150px;
}
</style>
