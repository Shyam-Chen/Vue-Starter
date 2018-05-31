<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Class and Style Bindings</div>

    <div :class="{ ['cyan-color']: activeCyan }">Cyan</div>

    <div :style="{ color: teal800, backgroundColor: teal100 }">Teal</div>
    <div :style="purple">Purple</div>
    <div :style="[orange800, orange100]">Orange</div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  activeCyan: boolean,
  teal800: string,
  teal100: string,
  purple: { color: string, backgroundColor: string },
  orange800: { color: string },
  orange100: { backgroundColor: string },
};

export default {
  data(): Data {
    return {
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
    };
  },
};
</script>

<style scoped>
.cyan-color {
  color: #00bcd4;
}
</style>
