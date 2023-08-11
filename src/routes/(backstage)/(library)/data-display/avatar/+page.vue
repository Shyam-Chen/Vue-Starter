<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Avatar from '~/components/Avatar.vue';
import AvatarGroup from '~/components/AvatarGroup.vue';
import Badge from '~/components/Badge.vue';
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Avatar' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Avatar</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-2">
      <Avatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
      <Avatar icon="i-mdi-account" class="bg-indigo-700 text-white" />
      <Avatar class="bg-red-700 text-white">SC</Avatar>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Grouped</div>

    <div class="flex justify-center">
      <AvatarGroup :total="24">
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
        <Avatar src="https://mui.com/static/images/avatar/2.jpg" alt="Travis Howard" />
        <Avatar src="https://mui.com/static/images/avatar/3.jpg" alt="Cindy Baker" />
        <Avatar src="https://mui.com/static/images/avatar/4.jpg" alt="Agnes Walker" />
      </AvatarGroup>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">With badge</div>

    <div class="flex justify-center">
      <Badge class="important:bg-green-500 top-auto right-1 -bottom-1 border">
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
      </Badge>
    </div>
  </div>
</template>
