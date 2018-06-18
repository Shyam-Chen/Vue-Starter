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
    console.log('[*] Child: beforeCreate');
  },
  created() {
    console.log('[*] Child: created');
  },
  beforeMount() {
    console.log('[*] Child: beforeMount');
  },
  mounted() {
    console.log('[*] Child: mounted');
  },
  beforeUpdate() {
    console.log('[*] Child: beforeUpdate');
  },
  updated() {
    console.log('[*] Child: updated');
  },
  beforeDestroy() {
    console.log('[*] Child: beforeDestroy');
  },
  destroyed() {
    console.log('[*] Child: destroyed');
  },
};
</script>

<style scoped>
</style>
