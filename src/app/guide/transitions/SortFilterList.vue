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
            <div><v-icon>event</v-icon> {{ item.publish | timeSince }}</div>
            <div><v-icon>video_library</v-icon> {{ item.collectCount.toLocaleString('en-US') }}</div>
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
    timeSince(date) {
      const d = new Date(date * 1000);
      const now = new Date();
      console.log('[* 1]', date);

      console.log('[* 2]', now.getTime());

      const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));

      const minutes = Math.round(Math.abs(seconds / 60));
      const hours = Math.round(Math.abs(minutes / 60));
      const days = Math.round(Math.abs(hours / 24));
      const months = Math.round(Math.abs(days / 30.416));
      const years = Math.round(Math.abs(days / 365));

      if (Number.isNaN(seconds)) {
        return '';
      } else if (seconds <= 45) {
        return 'a few seconds ago';
      } else if (seconds <= 90) {
        return 'a minute ago';
      } else if (minutes <= 45) {
        return `${minutes} minutes ago`;
      } else if (minutes <= 90) {
        return 'an hour ago';
      } else if (hours <= 22) {
        return `${hours} hours ago`;
      } else if (hours <= 36) {
        return 'a day ago';
      } else if (days <= 25) {
        return `${days} days ago`;
      } else if (days <= 45) {
        return 'a month ago';
      } else if (days <= 345) {
        return `${months} months ago`;
      } else if (days <= 545) {
        return 'a year ago';
      }

      return `${years} years ago`;
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
        const typedList = type => list.sort((a, b) => a[type] - b[type]).reverse();

        if (sort === 'published') return typedList('publish');
        if (sort === 'views') return typedList('views');
        if (sort === 'collections') return typedList('collectCount');

        return list;
      };
    },
    filerList(length) {
      return list =>
        list.filter((item) => {
          if (length === 'lessThanFive') return item.duration < 300;
          if (length === 'fiveToTen') return item.duration >= 300 && item.duration <= 600;
          if (length === 'moreThanTen') return item.duration > 600;

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
  height: 150px;
}
</style>
