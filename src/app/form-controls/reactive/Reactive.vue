<script>
export default {
  render() {
    return (
      <v-layout column>
        <div class="display-1">Reactive</div>

        <form class="form">
          <div class="row">
            ...
          </div>
        </form>
      </v-layout>
    );
  }
};
</script>

<style scoped>
.form {
  padding: 1rem;
  background: #FFFFFF;
}

.row {
  padding: .66rem;
  display: flex;
  flex-direction: row;
}

.input {
  max-width: 10rem;
}

.outputs {
  align-self: center;
  margin: 0 0 .5rem .5rem;
  color: #009688;
}
</style>
