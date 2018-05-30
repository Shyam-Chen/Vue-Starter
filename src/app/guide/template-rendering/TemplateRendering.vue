<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Template Rendering</div>

      <v-layout column class="mt-2 mb-1">
        <div class="title mb-2">Template Syntax</div>
        <div>Text {{ text }}</div>
        <div>{{ number + 1 }}</div>
        <div>...</div>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Computed Properties and Watchers</div>
        <div>...</div>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Class and Style Bindings</div>

        <div :class="{ ['cyan-color']: activeCyan }">Cyan</div>

        <div :style="{ color: teal800, backgroundColor: teal100 }">Teal</div>
        <div :style="purple">Purple</div>
        <div :style="[orange800, orange100]">Orange</div>

        <div>...</div>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Conditional Rendering</div>
        <div v-if="show">Can see this text</div>
        <div v-if="!show">Can't see this text</div>
        <div>...</div>
      </v-layout>

      <v-layout column class="mt-1 mb-2">
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

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: 'foo',
      number: 10,

      activeCyan: true,
      teal800: '#00695C',
      teal100: '#B2DFDB',
      purple: {
        color: '#6A1B9A',  // purple 800
        backgroundColor: '#E1BEE7',  // purple 100
      },
      orange800: {
        color: '#EF6C00',
      },
      orange100: {
        backgroundColor: '#FFE0B2',
      },

      show: true,

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
.layout {
  border: 1px solid #e91e63;
  padding: 1rem;
}

.cyan-color {
  color: #00bcd4;
}
</style>
