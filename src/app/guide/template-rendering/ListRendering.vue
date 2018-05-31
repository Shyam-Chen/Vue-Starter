<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">List Rendering</div>

    <ul class="pl-3 mb-1">
      <li v-for="(item, index) in listArray" :key="index">
        {{ item.message }}
      </li>
    </ul>

    <ul class="pl-3 mt-1">
      <li v-for="(value, index) in listObject" :key="index">
        {{ value }}
      </li>
    </ul>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  listArray: Array<{ message: string }>,
  listObject: { foo: string, bar: string, baz: string },
};

export default {
  data(): Data {
    return {
      listArray: [
        { message: 'Foo' },
        { message: 'Bar' },
        { message: 'Baz' },
      ],
      listObject: {
        foo: 'Foo',
        bar: 'Bar',
        baz: 'Baz',
      },
    };
  },
};
</script>

<style scoped>
</style>
