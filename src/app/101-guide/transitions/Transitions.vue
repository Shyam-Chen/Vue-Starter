<template>
  <v-container>
    <v-btn @click="fade = !fade">Fade</v-btn>
    <transition name="fade">
      <div v-if="fade">Block</div>
    </transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fade: true,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
