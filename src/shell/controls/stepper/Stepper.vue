<template>
  <v-container id="stepper" class="shell-container" fluid>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Name of step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="step = 2">Next</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="step = 1">Previous</v-btn>
          <v-btn color="primary" @click="step = 3">Next</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="step = 2">Previous</v-btn>
          <v-btn color="primary" @click="snackbar = true">Complete</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 0,

      snackbar: false,
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: 'OK!',
    };
  },
};
</script>
