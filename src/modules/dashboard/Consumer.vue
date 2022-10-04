<script lang="ts" setup>
import { reactive } from 'vue';

import { useState, useActions, useComputeds } from './store';

const state = useState();
const actions = useActions();
const computeds = useComputeds();

const flux = reactive({});
</script>

<template>
  <div>dashboard</div>
</template>
