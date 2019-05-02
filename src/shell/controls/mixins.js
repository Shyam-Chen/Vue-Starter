export const controlsStore = {
  created() {
    if (!this.$store.state.controls) {
      this.$store.registerModule(['controls'], { namespaced: true });
    }
  },
};
