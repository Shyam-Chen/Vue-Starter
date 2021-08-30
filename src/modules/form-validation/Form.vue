<script setup>
import { reactive, computed } from 'vue';
import { useValidator, useValidation } from 'vue-formor';

const state = reactive({
  form: {
    firstField: '',
    secondField: '',
  },
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [
    [computed(() => state.form.firstField), [validator.required]],
    [computed(() => state.form.secondField), [validator.required]],
  ],
  state.errors,
);

const submit = () => {
  if (validation.validate()) {
    console.log('Submit');
  }
};
</script>

<template>
  <form>
    <div class="font-bold">Form</div>

    <div>
      <label for="form-firstField">First Field:</label>
      <input id="form-firstField" v-model="state.form.firstField" type="text" class="border" />
      <div class="text-red-500">{{ state.errors['form.firstField'] }}</div>
    </div>

    <div>
      <label for="form-secondField">Second Field:</label>
      <input id="form-secondField" v-model="state.form.secondField" type="text" class="border" />
      <div class="text-red-500">{{ state.errors['form.secondField'] }}</div>
    </div>

    <div>
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
        @click="submit"
      >
        Submit
      </button>
    </div>
  </form>
</template>
