<template>
  <v-container fluid>
    <div class="headline">Transitions</div>

    <v-layout align-center>
      <v-btn @click="fade.transition = !fade.transition">Fade Transition</v-btn>
      <transition name="fade-transition">
        <div v-if="fade.transition">Block</div>
      </transition>
    </v-layout>

    <v-layout align-center class="mt-1 mb-1">
      <v-btn @click="fade.animation = !fade.animation">Fade Animation</v-btn>
      <transition name="fade-animation">
        <div v-if="fade.animation">Block</div>
      </transition>
    </v-layout>

    <v-layout column class="mt-1">
      <div>
        <v-btn @click="type = 'all'">All</v-btn>
        <v-btn @click="type = 'odd'">Odd</v-btn>
        <v-btn @click="type = 'even'">Even</v-btn>
      </div>

      <transition-group tag="ul" name="fade-group" class="fade-list">
        <li v-for="item in filerList" :key="item" class="fade-item">{{ item }}</li>
      </transition-group>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fade: {
        transition: true,
        animation: true,
      },

      type: 'all',
      list: Array(21).fill(1).map((x, y) => x + y),
    };
  },
  computed: {
    filerList() {
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
/* fade-transition */
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.5s;
}

.fade-transition-enter,
.fade-transition-leave-to {
  opacity: 0;
}

/* fade-animation */
.fade-animation-enter-active {
  animation: fade 0.5s;
}

.fade-animation-leave-active {
  animation: fade 0.5s reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/* fade-group */
.fade-list {
  width: 21rem;
  padding: 0;
}

.fade-item {
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
  transition: opacity 1s, transform 1s;
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
