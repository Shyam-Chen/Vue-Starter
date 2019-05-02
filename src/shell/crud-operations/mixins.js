// @flow

export const crudOperationsStore = {
  created(): void {
    if (!this.$store.state.crudOperations) {
      this.$store.registerModule(['crudOperations'], { namespaced: true });
    }
  },
};
