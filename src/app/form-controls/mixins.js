export const formControlsStore = {
  created() {
    if (!this.$store.state.formControls) {
      this.$store.registerModule(['formControls'], { namespaced: true });
    }
  },
};
