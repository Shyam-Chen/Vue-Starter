<script setup>
import { defineProps, reactive } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });

const router = useRouter();

router.addRoute({
  name: 'admin',
  path: '/admin',
  component: Admin,
  children: [{ path: 'settings', component: AdminSettings }],
});
</script>

<template>
  <h3>CRUD Operations</h3>
  <router-view></router-view>
</template>
