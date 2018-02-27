<script>
export default {
  render() {
    return (
      <div>
        <v-btn color="info" to="/counter">Counter</v-btn>
        <v-btn color="info" to="/rest">REST</v-btn>
        {/* <v-btn color="info" to="/graphql">GraphQL</v-btn> */}
        <v-btn color="info" to="/form-controls">Form Controls</v-btn>
      </div>
    );
  }
};
</script>

<style scoped>
</style>
