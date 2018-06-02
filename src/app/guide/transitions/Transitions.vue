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

    <FilerList />
  </v-container>
</template>

<script>
import FilerList from './FilerList';

export default {
  components: {
    FilerList,
  },
  data() {
    return {
      fade: {
        transition: true,
        animation: true,
      },
    };
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
</style>
