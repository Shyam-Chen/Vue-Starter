<template>
  <div>
    <li v-for="item in data" :key="item.label">
      <span>{{ item.label }}</span>

      <ul v-if="item.children && item.children.length">
        <RecursiveList :data="item.children" />
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'RecursiveList',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
