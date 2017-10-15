<template>
  <div>
    <md-whiteframe md-tag="md-toolbar" md-elevation="4" class="toolbar">
      <div v-if="location === '/'" key="location-index">
        <md-button class="md-icon-button">
          <md-icon>toys</md-icon>
        </md-button>
      </div>
      <div v-else key="location-back">
        <router-link to="/" tag="md-button" class="md-icon-button">
          <md-icon>arrow_back</md-icon>
        </router-link>
      </div>

      <h2 class="md-title" style="flex: 1">Vue by Example</h2>
    </md-whiteframe>

    <div class="filling"></div>

    <div v-if="location === '/'">
      <router-link to="/counter" tag="md-button" class="md-raised md-primary">Counter</router-link>
      <router-link to="/rest" tag="md-button" class="md-raised md-primary">REST</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: location.pathname
    };
  }
};
</script>

<style scoped>
.toolbar {
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
  width: 100%;
}

.filling {
  padding-top: 64px;
}
</style>
