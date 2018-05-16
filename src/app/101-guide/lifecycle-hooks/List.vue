<template>
  <div>
    {{ id }}. {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: '',
    },
  },
  beforeCreate() {
    console.log('[*] B: beforeCreate');
  },
  created() {
    console.log('[*] B: created');
  },
  beforeMount() {
    console.log('[*] B: beforeMount');
  },
  mounted() {
    console.log('[*] B: mounted');
  },
  beforeUpdate() {
    console.log('[*] B: beforeUpdate');
  },
  updated() {
    console.log('[*] B: updated');
  },
  beforeDestroy() {
    console.log('[*] B: beforeDestroy');
  },
  destroyed() {
    console.log('[*] B: destroyed');
  },
};
</script>

<style scoped>
</style>
