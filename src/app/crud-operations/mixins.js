export const crudOperationsStore = {
  created() {
    if (!this.$store.state.crudOperations) {
      this.$store.registerModule(['crudOperations'], { namespaced: true });
    }
  },
};
