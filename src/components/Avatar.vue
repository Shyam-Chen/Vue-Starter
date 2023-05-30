<script lang="ts" setup>
defineProps<{
  src?: string;
}>();
</script>

<template>
  <img
    class="w-10 h-10 rounded-full"
    src="/docs/images/people/profile-picture-5.jpg"
    alt="Rounded avatar"
  />
  <img
    class="w-10 h-10 rounded"
    src="/docs/images/people/profile-picture-5.jpg"
    alt="Default avatar"
  />

  <slot></slot>

  <!-- <Avatar class="bg-red-500 text-white">SC</Avatar>
  <Avatar class="bg-red-500"><div class="i-mdi-account-circle"></div></Avatar>
  <Avatar src="profile-picture-5.jpg" /> -->
</template>
