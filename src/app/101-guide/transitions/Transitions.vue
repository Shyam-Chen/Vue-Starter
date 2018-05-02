<template>
  <v-container>
    <v-layout align-center>
      <v-btn @click="fade = !fade">Fade</v-btn>
      <transition name="fade">
        <div v-if="fade">Block</div>
      </transition>
    </v-layout>

    <v-layout align-center>
      <v-btn @click="fadeAnimation = !fadeAnimation">Fade Animation</v-btn>
      <transition name="fade-animation">
        <div v-if="fadeAnimation">Block</div>
      </transition>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fade: true,
      fadeAnimation: true,
    };
  },
};
</script>

<style scoped>
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
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
