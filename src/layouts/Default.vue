<script lang="ts" setup>
// import listOfLinks from '~/components/navigation/list-of-links';
// import NavLink from '~/components/navigation/NavLink.vue';
// import TextField from '~/components/TextField.vue';
// import Dropdown from '~/components/Dropdown.vue';

// const { role, displayName } = JSON.parse(sessionStorage.getItem('user'));

// const flux = reactive({
//   listOfLinks,
//   selectDropdown(option) {
//     if (option === '登出') {
//       sessionStorage.removeItem('token');
//       sessionStorage.removeItem('user');
//       navigateTo('/sign-in');
//     }
//   },
// });
</script>

<template>
  <div>
    <header class="navbar px-6 py-4 flex items-center">
      <!-- <img src="~/assets/logo.png" class="h-12 mr-6" /> -->

      <!-- <Dropdown :display="displayName" :options="['變更密碼', '登出']" @select="flux.selectDropdown" /> -->
    </header>

    <!-- <aside class="sidebar">
      <template v-for="link in flux.listOfLinks" :key="link.name">
        <NavLink :name="link.name" :to="link.to" :permissions="link.permissions" :sub="link.sub" :role="role"
          firstLevelStatus />
      </template>
    </aside> -->

    <main class="page container mx-auto">
      <slot></slot>
    </main>

    <!-- <select v-model="$i18n.locale">
      <option v-for="(lang, idx) in ['en-US', 'ja-JP', 'ko-KR', 'zh-TW']" :key="idx" :value="lang">
        {{ lang }}
      </option>
    </select> -->
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: #e6e7ee;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff;
}

.sidebar {
  font-size: 16px;
  width: 20rem;
  position: fixed;
  z-index: 10;
  margin: 0;
  top: 5rem;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  padding: 1rem 0;
  box-shadow: 10px 0px 15px -5px rgba(184, 185, 190, 0.4);
}

.page {
  padding: 7rem 2rem 2rem 22rem;
}
</style>
