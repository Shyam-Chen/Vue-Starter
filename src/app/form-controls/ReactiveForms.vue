<template>
  <div class="container">
    <h1>Reactive Forms</h1>

    <md-content class="md-elevation-2">
      <form class="form">
        <div class="row">
          ...
        </div>
      </form>
    </md-content>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  background: #FAFAFA;
  height: 100vh;
  padding: 1rem;
}

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
