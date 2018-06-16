<template>
  <v-container fluid>
    <div class="headline">Transitions</div>

    <FadeInAndOut />
    <FilerList />

    <v-layout row wrap align-center>
      <div>排序</div>
      <v-btn :class="{ primary: soft === 'publish' }" @click="soft = 'publish'">發佈時間</v-btn>
      <v-btn :class="{ primary: soft === 'views' }" @click="soft = 'views'">觀看次數</v-btn>
      <v-btn :class="{ primary: soft === 'collectCount' }" @click="soft = 'collectCount'">收藏次數</v-btn>
    </v-layout>

    <v-layout row wrap align-center>
      <div>長度</div>
      <v-btn :class="{ primary: length === 'all' }" @click="length = 'all'">不限</v-btn>
      <v-btn :class="{ primary: length === 'a' }" @click="length = 'a'">4 分鐘以下</v-btn>
      <v-btn :class="{ primary: length === 'b' }" @click="length = 'b'">5 - 10 分鐘</v-btn>
      <v-btn :class="{ primary: length === 'c' }" @click="length = 'c'">超過 10 分鐘</v-btn>
    </v-layout>

    <v-layout v-if="filerList.length !== 0" row wrap>
      <template v-for="item in softList(filerList)">
        <div :key="item.id" class="card ma-3">
          <div class="card-media">
            <img :src="item.thumbnail" class="card-image">
            <div>
              <span class="black white--text pa-1 card-time">{{ item.duration | timeString }}</span>
            </div>
          </div>

          <div class="card-content">
            <div class="pl-2 pr-2">{{ item.title | truncate(55) }}</div>
            <div class="ma-2"><v-icon>headset</v-icon> {{ item.views.toLocaleString('en-US') }}</div>
          </div>
        </div>
      </template>
    </v-layout>

    <div v-else>沒有篩選結果</div>
  </v-container>
</template>

<script>
import axios from 'axios';

import truncate from '../filters/truncate';

import FadeInAndOut from './FadeInAndOut';
import FilerList from './FilerList';

export default {
  components: {
    FadeInAndOut,
    FilerList,
  },
  filters: {
    truncate,
    timeString(value) {
      const date = new Date(null);
      date.setSeconds(value);
      return date.toISOString().substr(14, 5);
    },
  },
  data() {
    return {
      soft: 'publish',
      length: 'all',
      list: [],
    };
  },
  computed: {
    filerList() {
      return this.list.filter((item) => {
        // < 4
        if (this.length === 'a') {
          return item.duration <= 240;
        }

        // 5 ~ 10
        if (this.length === 'b') {
          return item.duration > 300 && item.duration < 600;
        }

        // > 10
        if (this.length === 'c') {
          return item.duration >= 600;
        }

        return this.list;
      });
    },
  },
  mounted() {
    axios.get('https://us-central1-lithe-window-713.cloudfunctions.net/fronted-demo')
      .then(({ data }) => {
        this.list = data.data;
      });
  },
  methods: {
    softList(list) {
      if (this.soft) {
        return list.sort((a, b) => a[this.soft] - b[this.soft]).reverse();
      }

      return list;
    },
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
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
  height: 93px;
}
</style>
