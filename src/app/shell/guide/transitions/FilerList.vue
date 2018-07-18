<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Filer List</div>

    <div>
      <v-btn @click="type = 'all'">All</v-btn>
      <v-btn @click="type = 'odd'">Odd</v-btn>
      <v-btn @click="type = 'even'">Even</v-btn>
    </div>

    <transition-group tag="ul" name="fade-group" class="filer-list">
      <li v-for="item in filerList" :key="item" class="filer-item">{{ item }}</li>
    </transition-group>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  type: string,
  list: number[],
};

export default {
  data(): Data {
    return {
      type: 'all',
      list: Array(21).fill(1).map((x, y) => x + y),
    };
  },
  computed: {
    filerList(): number[] {
      return this.list.filter((value) => {
        if (this.type === 'odd') return value % 2 === 1;
        if (this.type === 'even') return value % 2 === 0;
        return this.list;
      });
    },
  },
};
</script>

<style scoped>
.filer-list {
  width: 21rem;
  padding: 0;
}

.filer-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  color: #fff;
  background: #009688;
  filter: drop-shadow(0 0 0.25rem #00796b);
}

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
</style>
