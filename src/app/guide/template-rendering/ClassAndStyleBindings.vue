<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Class and Style Bindings</div>

    <div :class="{ ['cyan-color']: activeCyan }">Cyan</div>
    <div :class="pink">Pink</div>
    <div :class="[amber]">Amber</div>

    <div><span :style="{ color: teal800, backgroundColor: teal100 }">Teal</span></div>
    <div><span :style="purple">Purple</span></div>
    <div><span :style="[orange800, orange100]">Orange</span></div>
  </v-layout>
</template>

<script>
// @flow

type ClassBindings = {
  activeCyan: boolean,
  pink: { 'pink-color': boolean },
  amber: string,
};

type StyleBindings = {
  teal800: string,
  teal100: string,
  purple: { color: string, backgroundColor: string },
  orange800: { color: string },
  orange100: { backgroundColor: string },
};

type Data = ClassBindings & StyleBindings;

export default {
  data(): Data {
    return {
      // class bindings
      activeCyan: true,
      pink: {
        'pink-color': true,
      },
      amber: 'amber-color',

      // style bindings
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
    };
  },
};
</script>

<style scoped>
.cyan-color {
  color: #00bcd4;
}

.pink-color {
  color: #e91e63;
}

.amber-color {
  color: #ffc107;
}
</style>
