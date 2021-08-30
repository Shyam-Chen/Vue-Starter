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
    [
      computed(() => state.form.secondField),
      computed(() => (state.form.firstField === 'volvo' ? [validator.required] : [])),
    ],
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
    <div class="font-bold">Dynamic Rules</div>

    <div>
      <label for="cars">Choose a car:</label>
      <select id="cars" v-model="state.form.firstField" name="cars" class="border">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <div class="text-red-500">{{ state.errors['form.firstField'] }}</div>
    </div>

    <div>
      <label for="des">Second Field:</label>
      <input
        id="dynamicRules-secondField"
        v-model="state.form.secondField"
        type="text"
        class="border"
      />
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
