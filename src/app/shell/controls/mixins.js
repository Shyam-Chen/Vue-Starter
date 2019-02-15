export const formControlsStore = {
  created() {
    if (!this.$store.state.controls) {
      this.$store.registerModule(['controls'], { namespaced: true });
    }
  },
};
