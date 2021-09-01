<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useValidator, useValidation, useValidationStack } from 'vue-formor';

const state = reactive({
  table: [],
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [[computed(() => state.table), [validator.required]]],
  state.errors,
);

const validationStack = useValidationStack(
  computed(() => state.table),
  (row, idx) => [
    [computed(() => row.firstField), [validator.required]],
    [computed(() => row.secondField), [validator.required]],
  ],
  state.errors,
);

onMounted(() => {
  state.table = [{ firstField: '', secondField: '' }];
});

const add = () => {
  const arr = [...state.table];
  arr.push({ firstField: '', secondField: '' });
  state.table = arr;
};

const remove = (idx) => {
  const arr = [...state.table];
  arr.splice(idx, 1);
  state.table = arr;
};

const submit = () => {
  if (validator.validateAll(validation, validationStack)) {
    console.log('Submit');
  }
};
</script>

<template>
  <div>
    <div class="font-bold">Tabular Form</div>

    <button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded" @click="add">
      Add
    </button>

    <table>
      <tr v-for="(row, idx) in state.table" :key="idx">
        <td>
          <input v-model="row.firstField" class="border" />
          <div class="text-red-500">{{ state.errors[`table[${idx}].firstField`] }}</div>
        </td>
        <td>
          <input v-model="row.secondField" class="border" />
          <div class="text-red-500">{{ state.errors[`table[${idx}].secondField`] }}</div>
        </td>
        <td>
          <button
            class="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
            @click="remove(idx)"
          >
            Remove
          </button>
        </td>
      </tr>
    </table>

    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
      @click="submit"
    >
      Submit
    </button>
  </div>
</template>
